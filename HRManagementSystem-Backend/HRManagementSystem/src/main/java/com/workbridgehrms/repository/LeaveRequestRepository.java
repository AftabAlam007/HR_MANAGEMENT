package com.workbridgehrms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStatus(String status);
}
