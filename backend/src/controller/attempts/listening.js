const ListeningAttempt = require("../../models/ListeningAttempt");
const Listening = require("../../models/Listening");

// ✅ Create Attempt
exports.createListeningAttempt = async (req, res) => {
  try {
    const { testId, listeningId, answers } = req.body;

    // fetch listening section to check answers
    const listening = await Listening.findById(listeningId);
    if (!listening) {
      return res.status(404).json({ message: "Listening section not found" });
    }

    // evaluate score
    let score = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const input = listening.inputs.find((i) => i.id === ans.inputId);
      const isCorrect = input && ans.answer == input.correctAnswer;
      if (isCorrect) score++;
      return { ...ans, isCorrect };
    });

    const attempt = new ListeningAttempt({
      testId,
      listeningId,
      userId: req.user?._id || null, // optional, if user system exists
      answers: evaluatedAnswers,
      score,
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get one attempt
exports.getListeningAttempt = async (req, res) => {
  try {
    const attempt = await ListeningAttempt.findById(req.params.id)
      .populate("testId")
      .populate("listeningId");
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all attempts for a test or user
exports.getAllListeningAttempts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.testId) filter.testId = req.query.testId;
    if (req.query.userId) filter.userId = req.query.userId;

    const attempts = await ListeningAttempt.find(filter)
      .populate("testId")
      .populate("listeningId");
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update attempt (rare, but possible)
exports.updateListeningAttempt = async (req, res) => {
  try {
    const attempt = await ListeningAttempt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    res.json(attempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete attempt
exports.deleteListeningAttempt = async (req, res) => {
  try {
    const attempt = await ListeningAttempt.findByIdAndDelete(req.params.id);
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    res.json({ message: "Attempt deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
