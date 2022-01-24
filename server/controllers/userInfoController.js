const ConversationModel = require('../models/conversationModel');

exports.updateUserInfo = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    let userinfo, statusCode;

    if (req.body.deleteUserInfo) {
      console.log('hallllllllooooooooo');
      const { userid, username, profilePicture, useremail } = {
        ...req.body.deleteUserInfo,
      };
      console.log(userid, username, profilePicture, useremail);
      userinfo = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          $pull: {
            userInfo: {
              userid,
              username,
              profilePicture,
              useremail,
            },
          },
        },
        {
          multi: true,
          runValidators: true,
        }
      );
      statusCode = 200;
    } else if (req.body.addPerson) {
      userinfo = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          $push: { userInfo: req.body.addPerson },
        },

        {
          new: true,
          runValidators: true,
        }
      );
      statusCode = 200;
    }

    // console.log('userinfo:::::::', userinfo);

    res.status(statusCode).json({
      status: 'success',
      data: userinfo,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
