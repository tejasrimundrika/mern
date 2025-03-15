const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logRoutes = require("./routes/logRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use the routes
app.use("/api/logs", logRoutes); // ✅ This should work now

mongoose.connect("mongodb://localhost:27017/travel-log", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));
    app.get("/api/logs/:id", async (req, res) => {
      try {
        const log = await Log.findById(req.params.id);
        if (!log) {
          return res.status(404).json({ message: "Log not found" });
        }
        res.json(log);
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
    });
    
  

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
