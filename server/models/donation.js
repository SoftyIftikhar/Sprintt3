// models/donation.js
const mongoose = require("mongoose");

// Define Donation Schema
const donationSchema = new mongoose.Schema({
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  amount: Number,
  date: Date,
});

// Create Donation model
const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
