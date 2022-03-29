import { Server } from 'socket.io';

const io = new Server(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let chats = [];

const addChat = (chatId, socketId) => {
  !chats.some((chat) => chat.chatId === chatId) &&
    chats.push({ chatId, socketId });
};

const removeChat = (socketId) => {
  chats = chats.filter((chat) => chat.socketId !== socketId);
};

const getChat = (chatId) => {
  return chats.find((chat) => chat.chatId === chatId);
};

// server-side
io.on('connection', (socket) => {
  // whene connect
  console.log('a user connected.');

  socket.on('join_room', (data) => {
    socket.join(data, () => {
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  });

  socket.on('addChat', (chatId) => {
    addChat(chatId, socket.id);
    io.emit('getChats', chats);
  });
  // send and get message
  socket.on('sendMessage', ({ senderId, text, date, room }) => {
    const chat = getChat(room);
    console.log(chat);
    io.in(room).emit('getMessage', {
      sender: senderId,
      text: text,
      isRead: false,
      date: date,
      room: room,
    });
  });
  // socket.on('sendMessage', ({ senderId, text, date, room }) => {
  //   io.in(room).emit('getMessage', {
  //     sender: senderId,
  //     text: text,
  //     isRead: false,
  //     date: date,
  //     room: room,
  //   });
  // });

  socket.on('disconnect', () => {
    // whene diconnect
    console.log('a user disconnected!');
    removeChat(socket.id);
    io.emit('getChats', chats);
  });
});
