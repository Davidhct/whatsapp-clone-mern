const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversations', conversationSchema);
