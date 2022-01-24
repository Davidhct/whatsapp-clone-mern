const ConversationModel = require('../models/conversationModel');

exports.createConversation = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    if (req.body.isGroup === false) {
      const conve = await ConversationModel.find();
      // chack if the conversation exist
      conve.map((c) => {
        if (!c.isGroup) {
          if (c.members[0] === req.body.members[0]) {
            if (c.members[1] === req.body.members[1]) {
              throw new Error('The chat already exist');
            }
          } else if (c.members[0] === req.body.members[1]) {
            if (c.members[1] === req.body.members[0]) {
              throw new Error('The chat already exist');
            }
          }
        }
      });
    }
    // console.log(req.body);
    const newConversation = await ConversationModel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newConversation,
    });

    // const saveMessage = await newMessage.save();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getConversation = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    // const messages = await ConversationModel.find({
    //   conversationId: req.params.conversationId,
    // members: { $in: [req.params.id] }
    // });
    const conversation = await ConversationModel.find({
      members: req.params.id,
    });
    // console.log(conversation);
    res.status(200).json({
      status: 'success',
      data: conversation,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    const messages = await ConversationModel.find();

    res.status(200).json({
      status: 'success',
      data: messages,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateConversations = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    let conversation;
    ConversationModel.syncIndexes();
    if (req.body.messages) {
      // push the new message in to the array of messages
      const message = await ConversationModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { messages: req.body.messages },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      conversation = message;
    } else if (req.body.groupName) {
      // capitalize the first letter in the new name
      let strTmp = req.body.groupName;
      strTmp = strTmp.toLowerCase();
      let groupNameCapital = strTmp.charAt(0).toUpperCase() + strTmp.slice(1);

      const gName = await ConversationModel.findByIdAndUpdate(
        req.params.id,
        {
          groupName: groupNameCapital,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      conversation = gName;
    }

    res.status(200).json({
      status: 'success',
      data: conversation,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
// exports.updatePerson = async (req, res) => {
//   console.log(req.params);
//   console.log(req.body);

//   try {
//     ConversationModel.syncIndexes();
//     let members, statusCode;
// if (req.body.delId) {
//   console.log('hay from row 137 in delId');
//   members = await ConversationModel.findByIdAndUpdate(
//     req.query.chatId,
//     { $pull: { members: req.body.delId } },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   if (req.body.isGroup) {
//     console.log('hallllllllooooooooo');
//     const { userid, username, profilePicture, useremail } = {
//       ...req.body.userInfo,
//     };
//     console.log(userid, username, profilePicture, useremail);
//     members = await ConversationModel.findByIdAndUpdate(
//       req.query.chatId,
//       {
//         $pull: {
//           userInfo: {
//             userid,
//             username,
//             profilePicture,
//             useremail,
//           },
//         },
//       },
//       {
//         multi: true,
//         runValidators: true,
//       }
//     );
//   }
//   statusCode = 200;
//   if (members.members.length === 0) {
//     await ConversationModel.findByIdAndDelete(req.query.chatId);
//     members = null;
//     statusCode = 204;
//   }
// } else
// if (req.body.addPerson) {
//   members = await ConversationModel.findByIdAndUpdate(
//     req.query.chatId,
//     {
//       $push: { members: req.body.members },
//     },

//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   members = await ConversationModel.findByIdAndUpdate(
//     req.query.chatId,
//     {
//       $push: { userInfo: req.body.userInfo },
//     },

//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   statusCode = 200;
// } else
// if (req.body.reconnect) {
//   members = await ConversationModel.findByIdAndUpdate(
//     req.query.chatId,
//     { $push: { members: req.body.members } },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   statusCode = 200;
// }

// console.log('members:::::::', members);

//     res.status(statusCode).json({
//       status: 'success',
//       data: members,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

exports.deleteChat = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    await ConversationModel.findByIdAndDelete(req.params.id);
    // console.log('members:::::::', members);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
