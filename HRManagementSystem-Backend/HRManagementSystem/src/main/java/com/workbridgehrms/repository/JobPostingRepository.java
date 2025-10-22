package com.workbridgehrms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.JobPosting;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

	List<JobPosting> findByStatus(String status);

}
