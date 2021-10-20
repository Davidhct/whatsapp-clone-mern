const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userid: { type: String, require: true, unique: true },
    username: {
      type: String,
      require: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
