import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import conversationRouter from './routes/conversationRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import membersRouter from './routes/membersRoutes.js';
import userInfoRouter from './routes/userInfoRoutes.js';
import messagesRouter from './routes/messagesRoutes.js';

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

// app.use((req, res, next) => {
//   req.requetTime = new Date().toISOString();
//   next();
// });

//3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/conversations', conversationRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/members', membersRouter);
app.use('/api/v1/userInfo', userInfoRouter);
app.use('/api/v1/messages', messagesRouter);

// 4) START SERVER
export default app;
// module.exports = app;
