const express = require('express');
const morgan = require('morgan');

const conversationRouter = require('./routes/conversationRoutes');
const messageRouter = require('./routes/messageRoures');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requetTime = new Date().toISOString();
  next();
});

//3) ROUTES
app.use('/api/v1/conversations', conversationRouter);
// app.use('/api/v1/messages', messageRouter);

// 4) START SERVER

module.exports = app;
