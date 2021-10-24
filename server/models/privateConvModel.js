const mongoose = require('mongoose');

const privateConvSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
      unique: false,
    },
    messages: {
      type: [String],
    },
    isRead: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Privates', privateConvSchema);
