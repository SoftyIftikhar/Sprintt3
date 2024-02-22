const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { randomBytes } = require("crypto"); // Import randomBytes from crypto module

// POST route for user login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      // Generate a random secret key
      const secretKey = randomBytes(32).toString("hex");

      // Sign JWT token with the generated secret key
      const token = jwt.sign({ user }, secretKey, {
        expiresIn: "1h",
      });
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
