const ConversationModel = require('../models/conversationModel');

exports.updateMembers = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    let members, statusCode;

    if (req.body.deleteMemberId) {
      console.log('hay from row 8 in deleteMember');
      members = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        { $pull: { members: req.body.deleteMemberId } },
        {
          new: true,
          runValidators: true,
        }
      );
      statusCode = 200;
      if (members.members.length === 0) {
        await ConversationModel.findByIdAndDelete(req.query.chatId);
        members = null;
        statusCode = 204;
      }
    } else if (req.body.addPerson) {
      members = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          $push: { members: req.body.addPerson },
        },

        {
          new: true,
          runValidators: true,
        }
      );
      statusCode = 200;
    }

    // console.log('members:::::::', members);

    res.status(statusCode).json({
      status: 'success',
      data: members,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};