import Message from './../models/messageModel.js';

export const createMessage = async (req, res) => {
  try {
    Message.syncIndexes();
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

export const getMessage = async (req, res) => {
  try {
    Message.syncIndexes();
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    console.log(req.params);
    console.log(messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
export default { createMessage, getMessage };
