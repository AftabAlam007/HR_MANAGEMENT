package com.workbridgehrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.Payslip;
import com.workbridgehrms.model.User;

import java.util.List;

public interface PayslipRepository extends JpaRepository<Payslip, Long> {
    // Custom query to find all payslips for a specific user
    List<Payslip> findByUser(User user);
}