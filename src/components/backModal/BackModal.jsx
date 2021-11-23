import React from 'react';
import ChatModal from '../chatModal/ChatModal';
import GroupModal from '../groupModal/GroupModal';
import './BackModal.css';

const BackModal = ({
  currentChat,
  setChatModal,
  chatModal,
  addPerson,
  setAddPerson,
  groupModal,
  setGroupModal,
}) => {
  const handaleBackModal = () => {
    setChatModal(false);
    setAddPerson(false);
    setGroupModal(false);
  };
  return (
    <div className='back-modal-body'>
      <div className='back-modal' onClick={handaleBackModal}></div>

      <div className='modals'>
        {chatModal ? (
          <ChatModal
            currentChat={currentChat}
            setChatModal={setChatModal}
            chatModal={chatModal}
            addPerson={addPerson}
            setAddPerson={setAddPerson}
          />
        ) : (
          <GroupModal setGroupModal={setGroupModal} groupModal={groupModal} />
        )}
      </div>
    </div>
  );
};

export default BackModal;
