// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
import multer from 'multer';
import crypto from 'crypto';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
// const app = require('./app');

export const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, async (err) => {
  if (err) throw err;
  console.log('conncted to db');
});

// Create storage engine
export const storage = new GridFsStorage({
  url: DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App runnung on port ${port}...`);
});

const upload = multer({ storage });
export default upload;
