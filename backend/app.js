const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// Load env nếu chưa phải production
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/config/config.env' });
}

// Middleware cơ bản
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Route import
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);

// 👉 Serve frontend React build nếu đang ở PRODUCTION
if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware xử lý lỗi
app.use(errorMiddleware);

module.exports = app;
