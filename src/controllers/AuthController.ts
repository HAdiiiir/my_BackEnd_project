import { JsonController, Post, Body } from 'routing-controllers';
import { AuthService } from '../services/AuthService';
import { RegisterUserDto, LoginUserDto } from '../dto/AuthDto';
import { validate } from 'class-validator';

@JsonController('/auth')
export class AuthController {
  private authService = new AuthService();

  @Post('/register')
  async register(@Body() userData: RegisterUserDto) {
    // التحقق من صحة البيانات
    const errors = await validate(userData);
    if (errors.length > 0) {
      return { message: 'Validation failed', errors };
    }

    return this.authService.register(userData);
  }

  @Post('/login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }
}