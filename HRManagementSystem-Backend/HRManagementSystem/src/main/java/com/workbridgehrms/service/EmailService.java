package com.workbridgehrms.service;



import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException; // Import Spring's specific MailException
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    // This method will now throw a RuntimeException if email sending fails
    public void sendInvitationEmail(String toEmail, String recipientName, String token) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("You're invited to join WorkBridge!");

            String inviteLink = frontendUrl + "/accept-invite?token=" + token;
            String emailBody = String.format(
                "<div style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
                "<h3>Hi %s,</h3>" +
                "<p>You have been invited to create an account on WorkBridge. Please click the link below to set up your password and activate your account.</p>" +
                "<p style='margin: 20px 0;'>" +
                "  <a href=\"%s\" style=\"background-color:#16a34a;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\">Accept Invitation</a>" +
                "</p>" +
                "<p>This link will expire in 24 hours.</p>" +
                "</div>",
                recipientName, inviteLink
            );
            
            helper.setText(emailBody, true);

            logger.info("Attempting to send invitation email via JavaMailSender to {}", toEmail);
            javaMailSender.send(message);
            logger.info("Invitation email sent successfully to {}", toEmail);

        } catch (MessagingException | MailException e) {
            // This now catches Spring's specific mail exceptions.
            logger.error("!!! FAILED TO SEND EMAIL to {}: {}", toEmail, e.getMessage());
            
            // This is the most important change: we re-throw the exception.
            // This will cause the entire transaction to fail and send a 500 error to the frontend.
            throw new RuntimeException("Failed to send invitation email. Please check server logs and mail configuration.", e);
        }
    }

	public void sendWelcomeEmailWithCredentials(String email, String fullName, String plainTextPassword) {
		// TODO Auto-generated method stub
		
	}
}