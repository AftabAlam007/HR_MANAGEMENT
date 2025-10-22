package com.workbridgehrms.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.workbridgehrms.enums.Role;
import com.workbridgehrms.enums.UserStatus;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "app_users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    @Email
    private String email; // Universal email field

    @Column(nullable = true)
    private String password;

    // Fields from AdminSignup & CreateHrModal
    private String organizationName;
    private String jobTitle;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    private UserStatus status; 
    
    private Double salary;
    
    // Crucial flag for the "force reset password" flow
    @Column(nullable = false)
    private boolean requiresPasswordChange = false;
    
    
    //Fields for the invitation flow
    private String invitationToken;
    private LocalDateTime invitationTokenExpiry;

    // Field from AdminSignup form, NOT persisted to the database
    @Transient
    private String adminKey;

    // --- Getters & Setters ---
    // Standard getters and setters for all fields...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }
    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public boolean isRequiresPasswordChange() { return requiresPasswordChange; }
    public void setRequiresPasswordChange(boolean requiresPasswordChange) { this.requiresPasswordChange = requiresPasswordChange; }
    public String getAdminKey() { return adminKey; }
    public void setAdminKey(String adminKey) { this.adminKey = adminKey; }
    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }
    public String getInvitationToken() {
		return invitationToken;
	}
	public void setInvitationToken(String invitationToken) {
		this.invitationToken = invitationToken;
	}
	public LocalDateTime getInvitationTokenExpiry() {
		return invitationTokenExpiry;
	}
	public void setInvitationTokenExpiry(LocalDateTime invitationTokenExpiry) {
		this.invitationTokenExpiry = invitationTokenExpiry;
	}
	
	
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	// --- UserDetails Implementation ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email; // Use email as the username for authentication
    }
    
    // Boilerplate UserDetails methods
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}