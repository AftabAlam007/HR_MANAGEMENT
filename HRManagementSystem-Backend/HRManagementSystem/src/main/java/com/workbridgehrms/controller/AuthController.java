package com.workbridgehrms.controller;

import com.workbridgehrms.model.User;
import com.workbridgehrms.service.AuthService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register/admin")
    public ResponseEntity<Map<String, Object>> registerAdmin(@RequestBody User request) {
        return ResponseEntity.ok(authService.registerAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    
    @PostMapping("/accept-invite")
    public ResponseEntity<Map<String, Object>> acceptInvite(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String password = payload.get("password");
        Map<String, Object> response = authService.activateInvitedUser(token, password);
        return ResponseEntity.ok(response);
    }
}