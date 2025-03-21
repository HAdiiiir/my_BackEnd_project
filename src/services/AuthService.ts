import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RegisterUserDto, LoginUserDto } from '../dto/AuthDto';

dotenv.config();

export class AuthService {
  async register(userData: RegisterUserDto) {
    const { name, email, password, roles } = userData;

    // التحقق من أن الأدوار المسموح بها هي 'admin', 'user', أو 'manager'
    const allowedRoles = ['admin', 'user', 'manager'];
    const invalidRoles = roles.filter(roles => !allowedRoles.includes(roles));
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

    return { token };
  }
}