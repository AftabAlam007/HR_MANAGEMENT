package com.workbridgehrms.controller;

import com.workbridgehrms.model.LeaveRequest;
import com.workbridgehrms.model.PayrollRecord;
import com.workbridgehrms.model.User;
import com.workbridgehrms.service.UserService; // We will create this next
import org.springframework.core.io.InputStreamResource; // <-- ADD THIS IMPORT
import org.springframework.http.HttpHeaders; // <-- ADD THIS IMPORT
import org.springframework.http.MediaType; // <-- ADD THIS IMPORT
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream; // <-- ADD THIS IMPORT
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getMyProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateMyProfile(@RequestBody User userDetails, Authentication authentication) {
        User updatedUser = userService.updateUserProfile(authentication.getName(), userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/leave-history")
    public ResponseEntity<List<LeaveRequest>> getMyLeaveHistory(Authentication authentication) {
        return ResponseEntity.ok(userService.findLeaveHistoryByEmail(authentication.getName()));
    }

    @PostMapping("/apply-leave")
    public ResponseEntity<LeaveRequest> applyForLeave(@RequestBody LeaveRequest leaveRequest, Authentication authentication) {
        LeaveRequest newRequest = userService.submitLeaveRequest(authentication.getName(), leaveRequest);
        return ResponseEntity.ok(newRequest);
    }
    
    // === THIS IS THE CORRECTED PAYSLIP ENDPOINT ===
    @GetMapping("/payslips")
    public ResponseEntity<List<PayrollRecord>> getMyPayslips(Authentication authentication) {
        // This now correctly calls the service method which returns a List<PayrollRecord>
        return ResponseEntity.ok(userService.findPayslipsForUser(authentication.getName()));
    }
    
    // === THIS IS THE NEW, REQUIRED DOWNLOAD ENDPOINT ===
    @GetMapping("/payslips/{payslipId}/download")
    public ResponseEntity<InputStreamResource> downloadMyPayslip(@PathVariable Long payslipId, Authentication authentication) {
        ByteArrayInputStream pdf = userService.downloadPayslip(authentication.getName(), payslipId);
        
        // Create headers that force the browser to download the file
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=payslip_" + payslipId + ".pdf");
        
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }
}