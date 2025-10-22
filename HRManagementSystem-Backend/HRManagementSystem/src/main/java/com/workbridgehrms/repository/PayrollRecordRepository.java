package com.workbridgehrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workbridgehrms.model.PayrollRecord;
import com.workbridgehrms.model.User;

import java.util.List;

public interface PayrollRecordRepository extends JpaRepository<PayrollRecord, Long> {
	boolean existsByPayPeriod(String payPeriod);
    List<PayrollRecord> findByPayPeriod(String payPeriod);
    List<PayrollRecord> findByUser(User user); 
}