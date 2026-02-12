// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

/* ---------------------------
   NOTIFICATION ROUTES
----------------------------*/

// Fetch all notifications
router.get("/", notificationController.getNotifications);

// Mark specific notification as read
router.put("/:notificationId/read", notificationController.markAsRead);

// Mark all as read
router.put("/read-all", notificationController.markAllAsRead);

// Clear all notifications
router.delete("/", notificationController.clearAll);

module.exports = router;
