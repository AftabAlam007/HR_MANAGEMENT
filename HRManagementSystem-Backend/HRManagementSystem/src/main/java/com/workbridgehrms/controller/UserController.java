package com.workbridgehrms.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workbridgehrms.enums.Role;
import com.workbridgehrms.model.User;
import com.workbridgehrms.service.AuthService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final AuthService authService;

    public UserController(AuthService authService) { this.authService = authService; }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> payload) {
        String onboardingMethod = (String) payload.get("onboardingMethod");
        
        User user = new User();
        user.setFullName((String) payload.get("fullName"));
        user.setEmail((String) payload.get("email"));
        user.setRole(Role.valueOf((String) payload.get("role")));

        if ("invite".equals(onboardingMethod)) {
            String token = authService.createUserWithInvite(user);
            return ResponseEntity.ok(Map.of("invitationToken", token));
        } else {
            user.setPassword((String) payload.get("password"));
            User createdUser = authService.createUserWithTempPassword(user);
            return ResponseEntity.ok(createdUser);
        }
    }
    
    @PostMapping("/force-reset-password")
    public ResponseEntity<Map<String, Object>> forceResetPassword(
            @RequestBody Map<String, String> payload, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        String newPassword = payload.get("newPassword");
        Map<String, Object> response = authService.forceUpdatePassword(email, newPassword);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/resend-invite")
    public ResponseEntity<Map<String, String>> resendInvite(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email must be provided."));
        }

        String message = authService.resendInvitation(email);
        return ResponseEntity.ok(Map.of("message", message));
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = authService.findAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = authService.findUserById(userId);
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        User updatedUser = authService.updateUser(userId, userDetails);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        authService.deleteUserById(userId);
        return ResponseEntity.ok(Map.of("message", "User with ID " + userId + " has been deleted successfully."));
    }
}
