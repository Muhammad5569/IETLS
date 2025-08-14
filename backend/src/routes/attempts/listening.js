const express = require("express");
const {
  createListeningAttempt,
  getListeningAttempt,
  getAllListeningAttempts,
  updateListeningAttempt,
  deleteListeningAttempt,
} = require("../../controller/attempts/listening");

const router = express.Router();

// Create new attempt (submit answers)
router.post("/listening-attempts", createListeningAttempt);

// Get all attempts (optionally filter by testId or userId)
router.get("/listening-attempts", getAllListeningAttempts);

// Get single attempt
router.get("/listening-attempts/:id", getListeningAttempt);

// Update attempt
router.put("/listening-attempts/:id", updateListeningAttempt);

// Delete attempt
router.delete("/listening-attempts/:id", deleteListeningAttempt);

module.exports = router;
