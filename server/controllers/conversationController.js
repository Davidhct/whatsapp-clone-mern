const ConversationModel = require('../models/conversationModel');

exports.createMessage = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    if (req.body.isGroup === false) {
      const conve = await ConversationModel.find();

      conve.map((c) => {
        if (!c.isGroup) {
          if (c.members[0] === req.body.members[0]) {
            if (c.members[1] === req.body.members[1]) {
              console.log('---->>>', c);
              throw new Error('The chat already exist');
            }
          } else if (c.members[0] === req.body.members[1]) {
            console.log('ooooooo', c.members[1] === req.body.members[0]);
            if (c.members[1] === req.body.members[0]) {
              throw new Error('The chat already exist');
            }
          }
        }
      });
    }
    console.log(conve);
    const newMessage = await ConversationModel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newMessage,
    });

    // const saveMessage = await newMessage.save();
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    ConversationModel.syncIndexes();
    // const messages = await ConversationModel.find({
    //   conversationId: req.params.conversationId,
    // });
    const message = await ConversationModel.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json({
      status: 'success',
      data: message,
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

exports.updateMesssages = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    ConversationModel.syncIndexes();
    const message = await ConversationModel.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: req.body.messages } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: message,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.updatePerson = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    ConversationModel.syncIndexes();
    let members;
    if (req.body.delId) {
      members = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        { $pull: { members: req.body.delId } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else if (req.body.addPerson) {
      members = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        {
          $push: { members: req.body.members },
          $push: { userInfo: req.body.userInfo },
        },

        {
          new: true,
          runValidators: true,
        }
      );
    } else if (req.body.reconnect) {
      members = await ConversationModel.findByIdAndUpdate(
        req.query.chatId,
        { $push: { members: req.body.members } },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    // console.log('members:::::::', members);

    res.status(200).json({
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
