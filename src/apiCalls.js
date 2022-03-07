import axios from './axios';

const deleteUser = async (event, currentChat, userInfo) => {
  event.preventDefault();
  let newAdmin;
  try {
    // delete yourself from be in the manager if you'r the only manager,
    // and make someone else to be the manager.
    // currentChat?.admin.length === 1 &&
    currentChat?.admin.forEach(async (admin) => {
      if (admin === userInfo.userid) {
        if (currentChat?.admin.length === 1) {
          newAdmin = currentChat?.members.find(
            (member) => member !== userInfo.userid
          );
          await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
            addAdminId: newAdmin,
          });
        }

        console.log(newAdmin);
        await axios.patch('/api/v1/admin/?chatId=' + currentChat?._id, {
          deleteAdminId: admin,
        });
      }
    });
    const { userid, username, profilePicture, useremail } = { ...userInfo };

    await axios.patch('/api/v1/members/?chatId=' + currentChat?._id, {
      deleteMemberId: userid,
    });
    await axios.patch('/api/v1/userInfo/?chatId=' + currentChat?._id, {
      deleteUserInfo: { userid, username, profilePicture, useremail },
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default deleteUser;
