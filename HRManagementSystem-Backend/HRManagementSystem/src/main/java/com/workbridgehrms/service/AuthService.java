package com.workbridgehrms.service;

import com.workbridgehrms.enums.Role;
import com.workbridgehrms.enums.UserStatus;
import com.workbridgehrms.model.User;
import com.workbridgehrms.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <-- CORRECTED IMPORT

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    // --- Registration & Login ---
    @Transactional
    public Map<String, Object> registerAdmin(User request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setOrganizationName(request.getOrganizationName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);
        user.setStatus(UserStatus.ACTIVE);
        user.setRequiresPasswordChange(false);
        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return Map.of("token", token);
    }

    public Map<String, Object> authenticate(User request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found."));
        if (user.getStatus() == UserStatus.PENDING) {
            throw new IllegalStateException("Account is pending activation. Please use the invitation link.");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        String token = jwtService.generateToken(user);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole().name());
        response.put("requiresPasswordChange", user.isRequiresPasswordChange());
        return response;
    }
    
    // --- User Creation (by Admin/HR) ---
    @Transactional
    public User createUserWithTempPassword(User request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) throw new IllegalArgumentException("Email is already in use.");
        String plainTextPassword = request.getPassword();
        User newUser = new User();
        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setJobTitle(request.getJobTitle());
        newUser.setSalary(request.getSalary());
        newUser.setPassword(passwordEncoder.encode(plainTextPassword));
        newUser.setRole(request.getRole());
        newUser.setStatus(UserStatus.ACTIVE);
        newUser.setRequiresPasswordChange(true);
        User savedUser = userRepository.save(newUser);
        emailService.sendWelcomeEmailWithCredentials(savedUser.getEmail(), savedUser.getFullName(), plainTextPassword);
        return savedUser;
    }

    @Transactional
    public String createUserWithInvite(User request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) throw new IllegalArgumentException("Email is already in use.");
        User newUser = new User();
        newUser.setFullName(request.getFullName());
        newUser.setEmail(request.getEmail());
        newUser.setJobTitle(request.getJobTitle());
        newUser.setSalary(request.getSalary());
        newUser.setRole(request.getRole());
        newUser.setStatus(UserStatus.PENDING);
        newUser.setInvitationToken(UUID.randomUUID().toString());
        newUser.setInvitationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(newUser);
        emailService.sendInvitationEmail(newUser.getEmail(), newUser.getFullName(), newUser.getInvitationToken());
        return "Invitation has been successfully sent to " + newUser.getEmail();
    }

    // --- Account Activation & Password Resets ---
    @Transactional
    public Map<String, Object> activateInvitedUser(String token, String password) {
        User user = userRepository.findByInvitationToken(token).orElseThrow(() -> new IllegalArgumentException("Invalid invitation token."));
        if (user.getInvitationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invitation token has expired.");
        }
        user.setPassword(passwordEncoder.encode(password));
        user.setStatus(UserStatus.ACTIVE);
        user.setInvitationToken(null);
        user.setInvitationTokenExpiry(null);
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        return Map.of("token", jwt, "message", "Account activated successfully.");
    }
    
    @Transactional
    public Map<String, Object> forceUpdatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found for password update"));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setRequiresPasswordChange(false);
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return Map.of("token", token, "message", "Password updated successfully.");
    }

    @Transactional
    public String resendInvitation(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user found with the email: " + email));
        if (user.getStatus() != UserStatus.PENDING) {
            throw new IllegalStateException("Cannot resend invitation. User is not in a PENDING state.");
        }
        String newToken = UUID.randomUUID().toString();
        user.setInvitationToken(newToken);
        user.setInvitationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);
        emailService.sendInvitationEmail(user.getEmail(), user.getFullName(), newToken);
        return "A new invitation has been successfully sent to " + user.getEmail();
    }
     
    // --- User Management (Admin Only) ---
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
    
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
    }
    
    @Transactional
    public User updateUser(Long userId, User userDetails) {
        User existingUser = findUserById(userId);
        if (!existingUser.getEmail().equals(userDetails.getEmail()) && userRepository.findByEmail(userDetails.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Error: The new email address is already in use.");
        }
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setFullName(userDetails.getFullName());
        existingUser.setJobTitle(userDetails.getJobTitle());
        existingUser.setRole(userDetails.getRole());
        existingUser.setStatus(userDetails.getStatus());
        existingUser.setSalary(userDetails.getSalary());
        return userRepository.save(existingUser);
    }
    
    public void deleteUserById(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new UsernameNotFoundException("Cannot delete. User not found with ID: " + userId);
        }
        userRepository.deleteById(userId);
    }
}