const Message = require('./../models/messageModel');

exports.createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const saveMessage = await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    // console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
