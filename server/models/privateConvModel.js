const mongoose = require('mongoose');
const messageSchema = require('./messageModel');
// const ObjectId = Schema.Types.ObjectId;
const privateConvSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model('Privates', privateConvSchema);
