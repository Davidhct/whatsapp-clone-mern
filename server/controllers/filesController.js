const ConversationModel = require('../models/conversationModel');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.updateFiles = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldPath = files.profilePic.path;
    var newPath = path.join(__dirname, 'uploads') + '/' + files.profilePic.name;
    var rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      return res.send('Successfully uploaded');
    });
  });
};
// exports.updateFiles = async (req, res) => {
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
// };
