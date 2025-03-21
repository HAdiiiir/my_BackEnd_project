import { IsEmail, IsString, MinLength, IsIn, IsArrary } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string = '';

  @IsEmail()
  email: string = '';

  @IsString()
  @MinLength(6)
  password: string = '';

  @IsIn(['user', 'admin', 'super_admin'])
  role: string = 'user';

  @IsArrary()
  roles: string[];
}

export class LoginUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}