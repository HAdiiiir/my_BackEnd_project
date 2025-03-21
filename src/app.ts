import 'reflect-metadata';
import { createServer } from 'http';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AuthController } from './controllers/AuthController';
import { ProtectedController } from './controllers/ProtectedController';
import { errorHandler } from './middlewares/errorMiddleware';
import { notFoundHandler } from './middlewares/notFoundMiddleware';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Use routing-controllers
useExpressServer(app, {
  controllers: [AuthController, ProtectedController],
});

// معالجة الطلبات غير المعروفة
app.use(notFoundHandler);

// استخدام middleware لمعالجة الأخطاء
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


