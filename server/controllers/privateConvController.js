// router.route('/').get(privateConvController.getAllMessages).post(privateConvController.createMessage);

// router.route('/:conversationId').get(privateConvController.getMessage).patch(privateConvController.updateMesssages);

const PrivateConve = require('./../models/PrivateConvModel');

exports.createMessage = async (req, res) => {
  try {
    PrivateConve.syncIndexes();
    const newMessage = await PrivateConve.create(req.body);

    // const saveMessage = await newMessage.save();
    res.status(201).json({
      status: 'success',
      data: newMessage,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getMessage = async (req, res) => {
  try {
    PrivateConve.syncIndexes();
    // const messages = await PrivateConve.find({
    //   conversationId: req.params.conversationId,
    // });
    const message = await PrivateConve.find({
      members: { $in: [req.params.userId] },
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
    PrivateConve.syncIndexes();
    const messages = await PrivateConve.find();

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
  console.log(req.body.members);
  //   const conversation = await PrivateConve.find({
  //     members: { $in: [req.body.members] },
  //   });
  //   console.log("////////'''''''", conversation);
  try {
    PrivateConve.syncIndexes();
    // console.log(req.body);

    // const oldMessages = await PrivateConve.find(req.body.members);
    const message = await PrivateConve.findOneAndUpdate(
      { $in: { members: req.body.members } },
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
      message: err.nessage,
    });
  }
};
