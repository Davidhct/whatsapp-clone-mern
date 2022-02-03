import UserModel from './../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    await UserModel.syncIndexes();
    // console.log(req.body);
    const newUser = await UserModel.create(req.body);

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
export const getUser = async (req, res) => {
  try {
    await UserModel.syncIndexes();

    const userId = req.query.userId;
    // console.log('---->', userId);
    const user = await UserModel.find();
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
export const checkAndGetUser = async (req, res) => {
  try {
    await UserModel.syncIndexes();
    let targetUser;

    const user = await UserModel.find();

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

const createUserInfo = (user) => {
  let userInfo = {
    userid: user.userid,
    username: user.username,
    profilePicture: user.profilePicture,
    useremail: user.email,
  };
  return userInfo;
};
export const checkAndGetGroupUsers = async (req, res) => {
  try {
    await UserModel.syncIndexes();
    let targetUser;
    let list = [];
    // console.log(req.body);
    const user = await UserModel.find();

    user.map((m) => {
      if (req.body.group === true) {
        req.body.friendsList.map((g) => {
          if (req.body.group === true) {
            if (g === m.email) {
              let newUser = createUserInfo(m);
              list.push(newUser);
            }
          }
        });
      } else if (req.body.group === false) {
        if (req.body.friendsList === m.email) {
          let newUser = createUserInfo(m);

          list.push(newUser);
          return;
        }
      }
    });

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

export default { createUser, getUser, checkAndGetUser, checkAndGetGroupUsers };
