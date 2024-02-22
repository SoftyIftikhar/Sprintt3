const mongoose = require("mongoose");

// Define Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: String,
  description: String,
  goal: Number,
  start_date: Date,
  end_date: Date,
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }], // Reference to Donation model
});

// Create Campaign model
const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
