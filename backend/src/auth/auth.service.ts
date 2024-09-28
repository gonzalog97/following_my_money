import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service'; // Importamos CategoriesService
import * as bcrypt from 'bcrypt';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly categoriesService: CategoriesService, // Inyectamos CategoriesService
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    console.log('Iniciando la validación del usuario');
    console.log('Username ingresado:', username);
    
    const user = await this.usersService.findByUsername(username);
    
    if (!user) {
      console.log('Usuario no encontrado');
      return null;
    }

    console.log('Usuario encontrado:', user.username);
    console.log('Contraseña almacenada en la base de datos (hash):', user.password);

    // Comparación de la contraseña proporcionada con la almacenada en la base de datos (hash)
    const isPasswordValid = await bcrypt.compare(pass.trim(), user.password.trim());

    console.log('Contraseña proporcionada:', pass);
    console.log('Resultado de bcrypt.compare:', isPasswordValid);

    if (user && isPasswordValid) {
      console.log('Contraseña correcta. Usuario validado con éxito.');
      return user;
    }

    console.log('Contraseña incorrecta. Validación fallida.');
    return null;
  }

  async login(username: string, password: string): Promise<{ access_token: string }> {
    console.log('Iniciando el proceso de login');
    const user = await this.validateUser(username, password);
    
    if (!user) {
      console.log('Login fallido: credenciales inválidas');
      throw new UnauthorizedException('Credenciales inválidas');
    }

    console.log('Login exitoso. Generando token JWT...');
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    console.log('Token JWT generado:', accessToken);

    return {
      access_token: accessToken,
    };
  }

  async register(username: string, email: string, password: string): Promise<User> {
    console.log('Iniciando el proceso de registro');
    console.log('Datos ingresados:');
    console.log('Username:', username);
    console.log('Email:', email);

    // Verificar si el username o email ya existe
    const existingUser = await this.usersService.findByUsername(username);
    const existingEmail = await this.usersService.findByEmail(email);
    
    if (existingUser) {
      console.log('Registro fallido: el nombre de usuario ya está en uso.');
      throw new BadRequestException('El nombre de usuario ya está en uso.');
    }

    if (existingEmail) {
      console.log('Registro fallido: el correo electrónico ya está en uso.');
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    console.log('Username y email disponibles. Procediendo a hashear la contraseña.');
    
    // Si no existe, crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Contraseña hasheada:', hashedPassword);
    
    const newUser = await this.usersService.createUser(username, email, hashedPassword);
    console.log('Usuario registrado exitosamente:', newUser);

    // Llamamos a la creación de categorías por defecto después de registrar al usuario
    await this.categoriesService.createDefaultCategories();

    return newUser;
  }
}
