package com.workbridgehrms.service;


import com.workbridgehrms.model.Applicant;
import com.workbridgehrms.model.JobPosting;
import com.workbridgehrms.repository.ApplicantRepository;
import com.workbridgehrms.repository.JobPostingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class PublicService {

    private final JobPostingRepository jobPostingRepository;
    private final ApplicantRepository applicantRepository;
    private final FileStorageService fileStorageService;

    public PublicService(JobPostingRepository jobPostingRepository, 
                         ApplicantRepository applicantRepository, 
                         FileStorageService fileStorageService) {
        this.jobPostingRepository = jobPostingRepository;
        this.applicantRepository = applicantRepository;
        this.fileStorageService = fileStorageService;
    }

    /**
     * Finds all job postings that have a status of "Open".
     */
    public List<JobPosting> findAllOpenJobs() {
        return jobPostingRepository.findByStatus("Open");
    }

    /**
     * Stores a resume file, creates a new applicant record, and links it to a job posting.
     */
    @Transactional
    public Applicant submitApplication(Long jobId, String name, String email, MultipartFile resumeFile) {
        // Find the job posting the applicant is applying for
        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job posting not found with ID: " + jobId));

        // Use the FileStorageService to save the resume and get its unique filename
        String fileName = fileStorageService.storeFile(resumeFile);

        // Create and populate the new Applicant entity
        Applicant newApplicant = new Applicant();
        newApplicant.setName(name);
        newApplicant.setEmail(email);
        newApplicant.setResumePath(fileName); // Store the unique filename, not the original
        newApplicant.setJobPosting(job);
        newApplicant.setStage("Screening"); // All new applications start at this stage
        newApplicant.setSubmitted(LocalDate.now());

        // Save the new applicant to the database and return the saved entity
        return applicantRepository.save(newApplicant);
    }
}