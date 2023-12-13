const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  followup_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FollowUp', followUpSchema);
