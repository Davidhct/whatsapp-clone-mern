import mongoose from 'mongoose';

const ImageUploadSchema = new mongoose.Schema(
  {
    lastModified: { type: Number, require: true, unique: false },
    name: {
      type: String,
      require: true,
      unique: false,
    },
    size: {
      type: Number,
      required: true,
      unique: false,
    },

    type: {
      type: String,
    },
    img: {
      data: Object,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('ImageUpload', ImageUploadSchema);
