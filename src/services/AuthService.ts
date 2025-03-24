import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RegisterUserDto } from '../dto/AuthDto';
import { sendEmail } from './EmailService';

dotenv.config();

export class AuthService {
  async register(userData: RegisterUserDto) {
    const { name, email, password, roles } = userData;

    // التحقق من الأدوار المسموح بها
    const allowedRoles = ['admin', 'user', 'manager'];
    const invalidRoles = roles.filter(role => !allowedRoles.includes(role));
    if (invalidRoles.length > 0) {
      throw new Error(`Invalid roles: ${invalidRoles.join(', ')}`);
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    await user.save();

    // إنشاء Token
    const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return { token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    // إنشاء Token
    const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // إرسال بريد إلكتروني
    const emailSubject = 'A message from Hadeer';
    const emailText = `\n\nهالو دعاء.\n\nانا المهندسه هدير جمال،\nهدير جمال`;
    await sendEmail('doaa.gamal1020@gmail.com', emailSubject, emailText);

    return { token };
  }
}