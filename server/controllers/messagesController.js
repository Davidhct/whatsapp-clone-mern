import ConversationModel from '../models/conversationModel.js';

export const getMessage = async (req, res) => {
  try {
    ConversationModel.syncIndexes();

    const chat = await ConversationModel.findById(req.query.chatId);

    res.status(200).json({
      status: 'success',
      data: chat.messages,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
export const updateMessages = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    ConversationModel.syncIndexes();

    // push the new message in to the array of messages
    const messages = await ConversationModel.findByIdAndUpdate(
      req.query.chatId,
      {
        $push: { messages: req.body.messages },
      },
      {
        new: true,
        runValidators: true,
      }
    );

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

export default { getMessage, updateMessages };
