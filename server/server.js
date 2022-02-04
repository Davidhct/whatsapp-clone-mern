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
// export const storage = new GridFsStorage({
//   url: DB,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'ImageUploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });
// app.post('/api/v1/files/', upload.single('file'), async (req, res, next) => {
//   try {
//     ImageUploadModel.syncIndexes();

//     console.log(upload);
//     // let obj = {
//     //   lastModified: req.body.lastModified,
//     //   name: req.body.name,
//     //   size: req.body.size,
//     //   type: req.body.type,
//     //   img: {
//     //     data: fs.readFileSync(
//     //       path.join(__dirname + '/ImageUploads/' + req.file.filename)
//     //     ),
//     //   },
//     // };
//     const newConversation = await ConversationModel.create(obj);
//     res.status(201).json({
//       status: 'success',
//       data: newConversation,
//     });

//     // const saveMessage = await newMessage.save();
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App runnung on port ${port}...`);
});

// export default upload;
