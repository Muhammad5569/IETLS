import mongoose from "mongoose";

const listeningAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Listening", required: true },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  status: { type: String, enum: ["in-progress", "completed"], default: "in-progress" },
  answers: [
    {
      inputId: { type: String, required: true }, 
      type: { type: String, enum: ["text", "checkbox", "radio"], required: true },
      value: { type: mongoose.Schema.Types.Mixed }, 
      isCorrect: { type: Boolean, default: null }, 
      marksAwarded: { type: Number, default: 0 }
    }
  ],
  totalScore: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("ListeningAttempt", listeningAttemptSchema);
