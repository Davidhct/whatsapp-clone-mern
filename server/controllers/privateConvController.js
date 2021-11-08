const PrivateConve = require('./../models/PrivateConvModel');

exports.createMessage = async (req, res) => {
  try {
    PrivateConve.syncIndexes();

    const conve = await PrivateConve.find();

    conve.map((c) => {
      if (c.members[0] === req.body.members[0]) {
        if (c.members[1] === req.body.members[1]) {
          throw new Error('The chat already exist');
        }
      } else if (c.members[0] === req.body.members[1]) {
        if (c.members[1] === req.body.members[0]) {
          throw new Error('The chat already exist');
        }
      }
    });
    console.log(req.body);
    const newMessage = await PrivateConve.create(req.body);
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
// exports.createMessage = async (req, res) => {
//   try {
//     PrivateConve.syncIndexes();
//     const newMessage = await PrivateConve.create(req.body);

//     // const saveMessage = await newMessage.save();
//     res.status(201).json({
//       status: 'success',
//       data: newMessage,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

exports.getMessage = async (req, res) => {
  try {
    PrivateConve.syncIndexes();
    // const messages = await PrivateConve.find({
    //   conversationId: req.params.conversationId,
    // });
    const message = await PrivateConve.find({
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
  console.log(req.params);
  console.log(req.body);

  try {
    PrivateConve.syncIndexes();
    const message = await PrivateConve.findByIdAndUpdate(
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
      message: err.nessage,
    });
  }
};
exports.updatePerson = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);

  try {
    PrivateConve.syncIndexes();
    let members;
    if (req.body.delId) {
      members = await PrivateConve.findByIdAndUpdate(
        req.query.chatId,
        { $pull: { members: req.body.delId } },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      members = await PrivateConve.findByIdAndUpdate(
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
    PrivateConve.syncIndexes();
    await PrivateConve.findByIdAndDelete(req.params.id);
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
