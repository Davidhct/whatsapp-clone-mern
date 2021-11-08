const Conversation = require('./../models/conversationModel');

exports.createConversation = async (req, res) => {
  try {
    const newConvesation = await Conversation.create({
      members: [req.body.senderId, req.body.receiverId],
    });
    // const newConvesation = new Conversation({
    //   members: [req.body.senderId, req.body.receiverId],
    // });
    // const saveConversation = await newConvesation.save();
    // res.status(201).json(saveConversation);
    res.status(201).json(newConvesation);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getUserConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    // res.status(200).json(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
