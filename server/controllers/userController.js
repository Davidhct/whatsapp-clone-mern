const User = require('./../models/userModel');

exports.createUser = async (req, res) => {
  try {
    await User.syncIndexes();
    // console.log(req.body);
    const newUser = await User.create(req.body);

    res.status(201).json(newUser);
    // console.log(req.body);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

//get a user
exports.getUser = async (req, res) => {
  try {
    await User.syncIndexes();
    const userId = req.query.userId;
    // console.log('---->', userId);
    const user = await User.find();
    // console.log(user);
    let targetUser;
    user.map((resId) => {
      if (resId.userid === userId) {
        targetUser = resId;
        return;
      }
    });
    // console.log(targetUser);
    res.status(200).json(targetUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//get a user
exports.checkAndGetUser = async (req, res) => {
  try {
    await User.syncIndexes();

    const user = await User.find();
    let targetUser;
    user.map((m) => {
      if (m.email === req.params.email) {
        targetUser = m;
        return;
      }
    });

    // console.log(targetUser);
    res.status(200).json(targetUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
