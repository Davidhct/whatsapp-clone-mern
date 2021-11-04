const mongoose = require('mongoose');

const groupConvSchema = new mongoose.Schema(
  {
    admin: { type: [String], require: true },
    groupName: { type: String, require: true },
    isGroup: { type: Boolean, default: true },
    members: { type: [String], require: true, unique: false },
    userInfo: {
      type: [
        {
          userid: { type: String, require: true },
          username: {
            type: String,
            require: true,
            unique: false,
          },
          profilePicture: {
            type: String,
          },
        },
      ],
      unique: false,
    },
    messages: {
      type: [
        {
          sender: {
            type: String,
            unique: false,
          },
          text: {
            type: String,
          },
          isRead: { type: Boolean },
          date: {
            type: Date,
          },
        },
        { timestamps: true },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Groups', groupConvSchema);
