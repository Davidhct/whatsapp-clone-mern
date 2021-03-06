import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    admin: { type: [String], require: false },
    profilePicture: {
      type: String,
      require: false,
      default: '',
    },
    groupName: { type: String, require: true },
    isGroup: { type: Boolean, default: false, require: true },
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
            require: false,
          },
          useremail: { type: String, require: true },
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

// module.exports = mongoose.model('Conversations', conversationSchema);
export default mongoose.model('Conversations', conversationSchema);
