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

    res.status(200).json(targetUser);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
//get a user
exports.checkAndGetUser = async (req, res) => {
  try {
    await User.syncIndexes();
    let targetUser;

    const user = await User.find();

    user.map((m) => {
      if (m.email === req.params.email) {
        targetUser = m;
        return;
      }
    });

    res.status(200).json(targetUser);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.checkAndGetGroupUsers = async (req, res) => {
  try {
    await User.syncIndexes();
    let targetUser;
    let list = [];
    console.log(req.body);
    const user = await User.find();

    user.map((m) => {
      if (req.body.group === true) {
        req.body.groupList.map((g) => {
          if (g === m.email) {
            let newUsr = { userid: m.userid, username: m.username };
            list.push(newUsr);
          }
        });
      } else {
        return;
      }
    });
    // if (list.length === 0) {
    //   throw new Error('These emails do not exist on the site');
    // } else {
    // }
    targetUser = [...list];
    console.log(targetUser);
    // res.status(200).json(targetUser);
    res.status(200).json(targetUser);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
      data: undefined,
    });
  }
};
