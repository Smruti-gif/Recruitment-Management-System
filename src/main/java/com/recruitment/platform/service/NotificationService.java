package com.recruitment.platform.service;

import com.recruitment.platform.dto.NotificationResponse;
import com.recruitment.platform.entity.Notification;
import com.recruitment.platform.entity.User;
import com.recruitment.platform.exception.ResourceNotFoundException;
import com.recruitment.platform.repository.NotificationRepository;
import com.recruitment.platform.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

        private final NotificationRepository notificationRepository;
        private final UserRepository userRepository;

        // =========================================================
        // CREATE NOTIFICATION
        // =========================================================

        @Transactional
        public NotificationResponse createNotification(
                        Long userId,
                        String title,
                        String message) {

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found with id: " + userId));

                Notification notification = Notification.builder()
                                .user(user)
                                .title(title)
                                .message(message)
                                .read(false)
                                .build();

                Notification savedNotification = notificationRepository.save(notification);

                return convertToResponse(savedNotification);
        }

        // =========================================================
        // GET ALL NOTIFICATIONS
        // =========================================================

        @Transactional(readOnly = true)
        public List<NotificationResponse> getUserNotifications(
                        Long userId) {

                verifyUser(userId);

                return notificationRepository
                                .findByUserIdOrderByCreatedAtDesc(userId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // GET UNREAD NOTIFICATIONS
        // =========================================================

        @Transactional(readOnly = true)
        public List<NotificationResponse> getUnreadNotifications(
                        Long userId) {

                verifyUser(userId);

                return notificationRepository
                                .findByUserIdAndReadFalseOrderByCreatedAtDesc(userId)
                                .stream()
                                .map(this::convertToResponse)
                                .toList();
        }

        // =========================================================
        // COUNT UNREAD NOTIFICATIONS
        // =========================================================

        @Transactional(readOnly = true)
        public long countUnreadNotifications(
                        Long userId) {

                verifyUser(userId);

                return notificationRepository
                                .countByUserIdAndReadFalse(userId);
        }

        // =========================================================
        // MARK NOTIFICATION AS READ
        // =========================================================

        @Transactional
        public NotificationResponse markAsRead(
                        Long notificationId) {

                Notification notification = notificationRepository.findById(notificationId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Notification not found with id: "
                                                                + notificationId));

                notification.setRead(true);

                Notification updatedNotification = notificationRepository.save(notification);

                return convertToResponse(updatedNotification);
        }

        // =========================================================
        // MARK ALL AS READ
        // =========================================================

        @Transactional
        public void markAllAsRead(Long userId) {

                verifyUser(userId);

                List<Notification> notifications = notificationRepository
                                .findByUserIdAndReadFalseOrderByCreatedAtDesc(
                                                userId);

                notifications.forEach(notification -> notification.setRead(true));

                notificationRepository.saveAll(notifications);
        }

        // =========================================================
        // VERIFY USER
        // =========================================================

        private void verifyUser(Long userId) {

                if (!userRepository.existsById(userId)) {

                        throw new ResourceNotFoundException(
                                        "User not found with id: " + userId);
                }
        }

        // =========================================================
        // DTO CONVERSION
        // =========================================================

        private NotificationResponse convertToResponse(
                        Notification notification) {

                return NotificationResponse.builder()
                                .id(notification.getId())
                                .userId(notification.getUser().getId())
                                .title(notification.getTitle())
                                .message(notification.getMessage())
                                .read(notification.isRead())
                                .createdAt(notification.getCreatedAt())
                                .build();
        }
}