package com.workbridgehrms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workbridgehrms.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Universal method to find any user by their email
    Optional<User> findByEmail(String email);
    Optional<User> findByInvitationToken(String token); // <-- ADD THIS LINE
}