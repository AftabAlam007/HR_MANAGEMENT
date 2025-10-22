package com.workbridgehrms.controller;

import com.workbridgehrms.model.Applicant;
import com.workbridgehrms.model.JobPosting;
import com.workbridgehrms.service.PublicService; // We will create this service next
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/public") // All endpoints here are public
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    /**
     * Fetches all job postings that have a status of "Open".
     * This is a public endpoint for the careers page.
     */
    @GetMapping("/jobs")
    public ResponseEntity<List<JobPosting>> getOpenJobPostings() {
        return ResponseEntity.ok(publicService.findAllOpenJobs());
    }

    /**
     * Allows an outsider to apply for a specific job.
     * @param jobId The ID of the job they are applying for.
     * @param applicant The applicant's details (name, email, etc.) from the form.
     */
    @PostMapping(value = "/jobs/{jobId}/apply", consumes = {"multipart/form-data"})
    public ResponseEntity<Map<String, String>> applyForJob(@PathVariable Long jobId,
                                                          @RequestParam("name") String name,
                                                          @RequestParam("email") String email,
                                                          @RequestParam("resume") MultipartFile resumeFile) {
        
        publicService.submitApplication(jobId, name, email, resumeFile);
        return ResponseEntity.ok(Map.of("message", "Your application has been submitted successfully!"));
    }
}