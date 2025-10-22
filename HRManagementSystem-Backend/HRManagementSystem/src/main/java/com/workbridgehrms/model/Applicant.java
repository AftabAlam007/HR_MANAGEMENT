package com.workbridgehrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "applicants")
public class Applicant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String resumePath;
    @ManyToOne
    @JoinColumn(name = "job_posting_id")
    private JobPosting jobPosting;
    private String stage; // "Screening", "Interview", "Offer", "Rejected"
    private LocalDate submitted;
    
    private LocalDateTime interviewDateTime;
    private String interviewer;
    
    
	public LocalDateTime getInterviewDateTime() {
		return interviewDateTime;
	}
	public void setInterviewDateTime(LocalDateTime interviewDateTime) {
		this.interviewDateTime = interviewDateTime;
	}
	public String getInterviewer() {
		return interviewer;
	}
	public void setInterviewer(String interviewer) {
		this.interviewer = interviewer;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public JobPosting getJobPosting() {
		return jobPosting;
	}
	public void setJobPosting(JobPosting jobPosting) {
		this.jobPosting = jobPosting;
	}
	public String getStage() {
		return stage;
	}
	public void setStage(String stage) {
		this.stage = stage;
	}
	public LocalDate getSubmitted() {
		return submitted;
	}
	public void setSubmitted(LocalDate submitted) {
		this.submitted = submitted;
	}
	public String getResumePath() {
		return resumePath;
	}
	public void setResumePath(String resumePath) {
		this.resumePath = resumePath;
	}

    
}