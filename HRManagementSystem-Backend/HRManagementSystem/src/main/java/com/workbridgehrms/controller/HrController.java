package com.workbridgehrms.controller;

import com.workbridgehrms.model.*;
import com.workbridgehrms.service.HrService;

import org.springframework.core.io.Resource; // <-- IMPORT THE CORRECT RESOURCE CLASS
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hr")
public class HrController {

    private final HrService hrService;

    public HrController(HrService hrService) {
        this.hrService = hrService;
    }

    @GetMapping("/employees")
    public ResponseEntity<List<User>> getAllEmployees() {
        return ResponseEntity.ok(hrService.findAllEmployees());
    }

    @GetMapping("/leave-requests")
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        return ResponseEntity.ok(hrService.findAllLeaveRequests());
    }
    
    @GetMapping("/leave-requests/pending")
    public ResponseEntity<List<LeaveRequest>> getPendingLeaveRequests() {
        return ResponseEntity.ok(hrService.findPendingLeaveRequests());
    }
    
    @PutMapping("/leave-requests/{id}/status")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(hrService.updateLeaveRequestStatus(id, payload.get("status")));
    }
    
    // === THIS IS THE CORRECTED ENDPOINT ===
    @PostMapping("/payroll/run")
    public ResponseEntity<Map<String, String>> runPayroll(@RequestBody Map<String, String> payload) {
        String payPeriod = payload.get("payPeriod");
        String message = hrService.runPayroll(payPeriod);
        return ResponseEntity.ok(Map.of("message", message));
    }
    
    @GetMapping("/job-postings")
    public ResponseEntity<List<JobPosting>> getAllJobPostings() {
        return ResponseEntity.ok(hrService.findAllJobPostings());
    }

    @PostMapping("/job-postings")
    public ResponseEntity<JobPosting> postNewJob(@RequestBody JobPosting job) {
        return ResponseEntity.ok(hrService.postNewJob(job));
    }
    
    @GetMapping("/applicants")
    public ResponseEntity<List<Applicant>> getAllApplicants() {
        return ResponseEntity.ok(hrService.findAllApplicants());
    }

    @GetMapping("/job-postings/{id}/applicants")
    public ResponseEntity<List<Applicant>> getApplicantsForJob(@PathVariable Long id) {
        return ResponseEntity.ok(hrService.findApplicantsByJob(id));
    }
    
    @PutMapping("/applicants/{id}/stage")
    public ResponseEntity<Applicant> updateApplicantStage(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(hrService.updateApplicantStage(id, payload.get("stage")));
    }
    
    @GetMapping("/applicants/{id}/resume")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id, HttpServletRequest request) {
        Map<String, Object> result = hrService.prepareResumeForDownload(id);
        Resource resource = (Resource) result.get("resource");
        String originalFilename = (String) result.get("originalFilename");

        String contentType = "application/octet-stream";
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            // It's okay to ignore and use the default content type
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFilename + "\"")
                .body(resource);
    }
    
    @PutMapping("/applicants/{id}/schedule-interview")
    public ResponseEntity<Applicant> scheduleInterview(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        LocalDateTime interviewDateTime = LocalDateTime.parse(payload.get("interviewDateTime"));
        String interviewer = payload.get("interviewer");
        Applicant updatedApplicant = hrService.scheduleInterview(id, interviewDateTime, interviewer);
        return ResponseEntity.ok(updatedApplicant);
    }
    
    @PostMapping("/payroll/generate")
    public ResponseEntity<List<PayrollRecord>> generatePayroll(@RequestBody Map<String, String> payload) {
        String payPeriod = payload.get("payPeriod");
        List<PayrollRecord> newRecords = hrService.generatePayrollForPeriod(payPeriod);
        return ResponseEntity.ok(newRecords);
    }
    
    // === NEW ENDPOINT NEEDED FOR PAYROLL PAGE ===
    @GetMapping("/payroll-records")
    public ResponseEntity<List<PayrollRecord>> getAllPayrollRecords() {
        return ResponseEntity.ok(hrService.findAllPayrollRecords());
    }
}