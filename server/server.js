const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, async (err) => {
  if (err) throw err;
  console.log('conncted to db');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App runnung on port ${port}...`);
});
