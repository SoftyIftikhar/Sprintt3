const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const campaignRoutes = require("./routes/campaignRoutes");
const passport = require("./passport"); // Import your Passport configuration
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://mongo:mongo@cluster0.n7fwiex.mongodb.net/Donationpal",
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(passport.initialize()); // Initialize Passport middleware
app.use("/api/users", usersRoutes); // Mount usersRoutes before other middleware
app.use("/api", campaignRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
