import ConversationModel from '../models/conversationModel.js';
// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const uuidv4 = require('uuid/v4');
// const router = express.Router();
// const DIR = '../../public';
// const fs = require('fs');

export const updateFiles = async (req, res, next) => {
  console.log('update data');
  console.log('ddd', req.body);
  try {
    let upFile;
    ConversationModel.syncIndexes();

    if (req.body.image) {
      // patch new image to the profile picture
      console.log('---------------', req.body);
      // upFile = await ConversationModel.findByIdAndUpdate(
      //   req.query.chatId,
      //   {
      //     profilePicture: req.body.image,
      //   },
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // );
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
export default { updateFiles };
