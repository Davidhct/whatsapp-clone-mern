import { Server } from 'socket.io';

const io = new Server(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// server-side
io.on('connection', (socket) => {
  // whene connect
  console.log('a user connected.');

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  // send and get message
  socket.on('sendMessage', ({ senderId, text, date, room }) => {
    io.to(room).emit('getMessage', {
      sender: senderId,
      text: text,
      isRead: false,
      date: date,
      room: room,
    });
  });

  socket.on('disconnect', () => {
    // whene diconnect
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
