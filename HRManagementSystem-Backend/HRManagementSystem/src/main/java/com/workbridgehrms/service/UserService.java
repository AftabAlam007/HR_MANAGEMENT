package com.workbridgehrms.service;



import com.workbridgehrms.model.LeaveRequest;
import com.workbridgehrms.model.PayrollRecord;
import com.workbridgehrms.model.Payslip;
import com.workbridgehrms.model.User;
import com.workbridgehrms.repository.LeaveRequestRepository;
import com.workbridgehrms.repository.PayrollRecordRepository;
import com.workbridgehrms.repository.PayslipRepository;
import com.workbridgehrms.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final PayrollRecordRepository payrollRecordRepository; // <-- USE the correct repository
    private final PdfGenerationService pdfService; // <-- ADD the PDF service

    // === THIS IS THE CORRECTED CONSTRUCTOR ===
    public UserService(UserRepository userRepository, 
                         LeaveRequestRepository leaveRequestRepository, 
                         PayrollRecordRepository payrollRecordRepository,
                         PdfGenerationService pdfService) {
        this.userRepository = userRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.payrollRecordRepository = payrollRecordRepository;
        this.pdfService = pdfService;
    }

    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Transactional
    public User updateUserProfile(String email, User userDetails) {
        User existingUser = getUserProfile(email);
        existingUser.setFullName(userDetails.getFullName());
        existingUser.setSalary(userDetails.getSalary());
        // In a real app, more fields like contact details would be updated here
        return userRepository.save(existingUser);
    }

    public List<LeaveRequest> findLeaveHistoryByEmail(String email) {
        User user = getUserProfile(email);
        // This is a simple filter for the demo. A direct repository query is better for performance.
        return leaveRequestRepository.findAll().stream()
            .filter(req -> req.getEmployeeName().equals(user.getFullName()))
            .toList();
    }

    @Transactional
    public LeaveRequest submitLeaveRequest(String email, LeaveRequest requestDetails) {
        User user = getUserProfile(email);
        
        LeaveRequest newRequest = new LeaveRequest();
        newRequest.setEmployeeName(user.getFullName());
        newRequest.setLeaveType(requestDetails.getLeaveType());
        newRequest.setStartDate(requestDetails.getStartDate());
        newRequest.setEndDate(requestDetails.getEndDate());
        
        long daysBetween = ChronoUnit.DAYS.between(requestDetails.getStartDate(), requestDetails.getEndDate()) + 1;
        newRequest.setDays((int) daysBetween);
        
        newRequest.setStatus("Pending");
        return leaveRequestRepository.save(newRequest);
    }
    
    // === THIS IS THE CORRECTED PAYSLIP METHOD ===
    public List<PayrollRecord> findPayslipsForUser(String email) {
        User user = getUserProfile(email);
        return payrollRecordRepository.findByUser(user);
    }
    
    // === THIS IS THE NEW PAYSLIP DOWNLOAD METHOD ===
    public ByteArrayInputStream downloadPayslip(String email, Long payslipId) {
        User user = getUserProfile(email);
        PayrollRecord record = payrollRecordRepository.findById(payslipId)
            .orElseThrow(() -> new RuntimeException("Payslip not found."));

        // Security check: ensure the user is only downloading their own payslip
        if (!record.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Access Denied: You are not authorized to download this payslip.");
        }
        
        return pdfService.generatePayslipPdf(record);
    }
}