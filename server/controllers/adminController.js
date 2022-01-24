const ConversationModel = require('../models/conversationModel');

exports.updateAdmin = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    let admin, statusCode;

    if (req.body.deleteAdminId) {
      admin = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        { $pull: { admin: req.body.deleteAdminId } },
        {
          new: true,
          runValidators: true,
        }
      );

      statusCode = 200;
    } else if (req.body.addAdminId) {
      admin = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        { $push: { admin: req.body.addAdminId } },
        {
          new: true,
          runValidators: true,
        }
      );
      statusCode = 200;
    }

    res.status(statusCode).json({
      status: 'success',
      data: admin,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
