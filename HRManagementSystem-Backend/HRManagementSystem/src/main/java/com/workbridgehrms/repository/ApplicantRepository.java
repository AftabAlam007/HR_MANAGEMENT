package com.workbridgehrms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.Applicant;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    List<Applicant> findByJobPostingId(Long jobPostingId);
}