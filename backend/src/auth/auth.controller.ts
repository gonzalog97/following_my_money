import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto'; // Importa CreateUserDto
import { LoginDto } from './dto/login.dto'; // Importa LoginDto
import { Public } from '../common/decorators/public.decorator'; // Importa el decorador @Public

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Esta ruta es pública, no requiere JWT
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    return this.authService.register(username, email, password);
  }

  @Public() // Esta ruta es pública, no requiere JWT
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    return this.authService.login(username, password);
  }
}
