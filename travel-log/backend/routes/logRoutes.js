const express = require("express");
const Log = require("../models/logModel");  // ✅ Correct


const router = express.Router();

// ➕ Create a new log
router.post("/", async (req, res) => {
  try {
    const newLog = new Log(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📜 Get all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update a log by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ message: "Log not found" });

    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🗑️ Delete a log
router.delete("/:id", async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
