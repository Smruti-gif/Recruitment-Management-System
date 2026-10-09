package com.recruitment.platform.controller;

import com.recruitment.platform.dto.NotificationResponse;
import com.recruitment.platform.service.NotificationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // ==========================================
    // GET ALL NOTIFICATIONS
    // ==========================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponse>> getUserNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );
    }

    // ==========================================
    // GET UNREAD NOTIFICATIONS
    // ==========================================

    @GetMapping("/user/{userId}/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.getUnreadNotifications(userId)
        );
    }

    // ==========================================
    // COUNT UNREAD NOTIFICATIONS
    // ==========================================

    @GetMapping("/user/{userId}/unread/count")
    public ResponseEntity<Long> countUnreadNotifications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                notificationService.countUnreadNotifications(userId)
        );
    }

    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(
            @RequestParam Long userId,
            @RequestParam String title,
            @RequestParam String message) {

        return ResponseEntity.ok(
                notificationService.createNotification(
                        userId,
                        title,
                        message
                )
        );
    }

    // ==========================================
    // MARK ONE AS READ
    // ==========================================

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markAsRead(
            @PathVariable Long notificationId) {

        return ResponseEntity.ok(
                notificationService.markAsRead(notificationId)
        );
    }

    // ==========================================
    // MARK ALL AS READ
    // ==========================================

    @PutMapping("/user/{userId}/read-all")
    public ResponseEntity<Void> markAllAsRead(
            @PathVariable Long userId) {

        notificationService.markAllAsRead(userId);

        return ResponseEntity.noContent().build();
    }
}