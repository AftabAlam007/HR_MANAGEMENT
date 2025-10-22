package com.workbridgehrms.service;

import com.workbridgehrms.enums.Role;
import com.workbridgehrms.enums.UserStatus;
import com.workbridgehrms.model.*;
import com.workbridgehrms.repository.*;

import org.springframework.core.io.Resource; // <-- IMPORT THE CORRECT RESOURCE CLASS
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HrService {

    private final UserRepository userRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final JobPostingRepository jobPostingRepository;
    private final ApplicantRepository applicantRepository;
    private final FileStorageService fileStorageService;
    private final PayrollRecordRepository payrollRecordRepository;

    public HrService(UserRepository userRepository, 
                     LeaveRequestRepository leaveRequestRepository, 
                     JobPostingRepository jobPostingRepository, 
                     ApplicantRepository applicantRepository,
                     FileStorageService fileStorageService,
                     PayrollRecordRepository payrollRecordRepository) { // Standardized parameter name
        this.userRepository = userRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.applicantRepository = applicantRepository;
        this.fileStorageService = fileStorageService;
        this.payrollRecordRepository = payrollRecordRepository; // Corrected assignment
    }

    // --- Employee Methods ---
    public List<User> findAllEmployees() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.USER || user.getRole() == Role.HR)
                .collect(Collectors.toList());
    }

    // --- Leave Methods ---
    public List<LeaveRequest> findAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> findPendingLeaveRequests() {
        return leaveRequestRepository.findByStatus("Pending");
    }

    @Transactional
    public LeaveRequest updateLeaveRequestStatus(Long requestId, String newStatus) {
        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave request not found with ID: " + requestId));
        
        if (!"Approved".equals(newStatus) && !"Denied".equals(newStatus)) {
            throw new IllegalArgumentException("Invalid status update. Must be 'Approved' or 'Denied'.");
        }
        
        request.setStatus(newStatus);
        return leaveRequestRepository.save(request);
    }

    // --- Recruitment Methods ---
    public List<JobPosting> findAllJobPostings() {
        return jobPostingRepository.findAll();
    }

    public JobPosting postNewJob(JobPosting jobPosting) {
        jobPosting.setStatus("Open");
        return jobPostingRepository.save(jobPosting);
    }
    
    public List<Applicant> findAllApplicants() {
        return applicantRepository.findAll();
    }

    public List<Applicant> findApplicantsByJob(Long jobPostingId) {
        return applicantRepository.findByJobPostingId(jobPostingId);
    }
    
    @Transactional
    public Applicant updateApplicantStage(Long applicantId, String newStage) {
        Applicant applicant = applicantRepository.findById(applicantId)
                .orElseThrow(() -> new RuntimeException("Applicant not found with ID: " + applicantId));
        
        applicant.setStage(newStage);
        return applicantRepository.save(applicant);
    }
    
    public Map<String, Object> prepareResumeForDownload(Long applicantId) {
        Applicant applicant = applicantRepository.findById(applicantId)
            .orElseThrow(() -> new RuntimeException("Applicant not found with ID: " + applicantId));

        String fileName = applicant.getResumePath();
        if (fileName == null || fileName.isEmpty()) {
            throw new RuntimeException("No resume on file for this applicant.");
        }

        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String fileExtension = "";
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex >= 0 && dotIndex < fileName.length() - 1) {
            fileExtension = fileName.substring(dotIndex);
        }
        String originalFilename = "Resume_" + applicant.getName().replace(" ", "_") + fileExtension;

        Map<String, Object> result = new HashMap<>();
        result.put("resource", resource);
        result.put("originalFilename", originalFilename);
        return result;
    }
    
    @Transactional
    public Applicant scheduleInterview(Long applicantId, LocalDateTime interviewDateTime, String interviewer) {
        Applicant applicant = applicantRepository.findById(applicantId)
                .orElseThrow(() -> new RuntimeException("Applicant not found with ID: " + applicantId));

        applicant.setInterviewDateTime(interviewDateTime);
        applicant.setInterviewer(interviewer);
        applicant.setStage("Interview");
        
        return applicantRepository.save(applicant);
    }
    
    // --- Payroll Methods ---
    @Transactional
    public List<PayrollRecord> generatePayrollForPeriod(String payPeriod) {
        if (payrollRecordRepository.existsByPayPeriod(payPeriod)) {
            throw new IllegalStateException("Payroll has already been generated for " + payPeriod);
        }

        List<User> activeEmployees = userRepository.findAll().stream()
                .filter(user -> user.getStatus() == UserStatus.ACTIVE && user.getRole() != Role.ADMIN && user.getSalary() != null)
                .toList();

        if (activeEmployees.isEmpty()) {
            throw new RuntimeException("No active employees with salaries found to generate payroll for.");
        }

        List<PayrollRecord> newRecords = activeEmployees.stream().map(employee -> {
            double monthlySalary = employee.getSalary() / 12.0;
            double basicSalary = monthlySalary * 0.40;
            double hra = basicSalary * 0.50;
            double specialAllowance = monthlySalary - basicSalary - hra;
            double grossPay = basicSalary + hra + specialAllowance;
            double providentFund = basicSalary * 0.12;
            double professionalTax = 200;
            double incomeTax = (grossPay > 50000) ? (grossPay * 0.10) : 0; 
            double totalDeductions = providentFund + professionalTax + incomeTax;
            double netPay = grossPay - totalDeductions;

            PayrollRecord record = new PayrollRecord();
            record.setEmployeeId("EMP" + employee.getId());
            record.setEmployeeName(employee.getFullName());
            record.setPayPeriod(payPeriod);
            record.setGrossPay(grossPay);
            record.setDeductions(totalDeductions);
            record.setNetPay(netPay);
            record.setStatus("Pending");
            return record;
        }).collect(Collectors.toList());

        return payrollRecordRepository.saveAll(newRecords);
    }
    
    @Transactional
    public String runPayroll(String payPeriod) {
        List<PayrollRecord> pendingRecords = payrollRecordRepository.findByPayPeriod(payPeriod).stream()
            .filter(record -> "Pending".equals(record.getStatus()))
            .toList();

        if (pendingRecords.isEmpty()) {
            return "No pending payroll records found to run for " + payPeriod;
        }

        pendingRecords.forEach(record -> {
            record.setStatus("Paid");
            record.setPayDate(LocalDate.now().toString());
        });

        payrollRecordRepository.saveAll(pendingRecords);
        return "Payroll for " + payPeriod + " has been processed successfully for " + pendingRecords.size() + " employees.";
    }
    
    public List<PayrollRecord> findAllPayrollRecords() {
        return payrollRecordRepository.findAll();
    }
}