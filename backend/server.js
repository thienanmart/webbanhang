const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Xử lý lỗi không bắt được (Uncaught Exception)
process.on('uncaughtException', err => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Load biến môi trường
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

// Kết nối cơ sở dữ liệu
connectDatabase();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Khởi động server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on PORT: ${PORT} in ${process.env.NODE_ENV} mode.`);
});

// Xử lý lỗi Promise không bắt
process.on('unhandledRejection', err => {
  console.error(`❌ Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
