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
  

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
