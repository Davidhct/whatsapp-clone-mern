const ConversationModel = require('../models/conversationModel');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const DIR = '../../public';
const fs = require('fs');
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//     cb(null, uuidv4() + '-' + fileName);
//   },
// });

// let upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == 'image/png' ||
//       file.mimetype == 'image/jpg' ||
//       file.mimetype == 'image/jpeg'
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
//   },
// });
exports.updateFiles = async (req, res, next) => {
  console.log(req.body.image);
  try {
    let upFile;
    ConversationModel.syncIndexes();

    if (req.body.image) {
      // patch new image to the profile picture
      console.log('---------------', req.body.image);
      upFile = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          profilePicture: req.body.image,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      status: 'success',
      data: upFile,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// exports.updateFiles = async (req, res) => {
//   console.log('dddddddddddddddddd', req.file);
//   try {
//     let file;
//     ConversationModel.syncIndexes();

//     if (req.body.image) {
//       // patch new image to the profile picture
//       console.log('---------------', req.body.image);
//       file = await ConversationModel.findByIdAndUpdate(
//         req.query.chatId,
//         {
//           profilePicture: req.body.image,
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     } else if (req.body.deleteImage) {
//       // patch nothing to the profile picture (delete image)
//       file = await ConversationModel.findByIdAndUpdate(
//         req.query.chatId,
//         {
//           profilePicture: '',
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     }

//     res.status(200).json({
//       status: 'success',
//       data: file,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// })
