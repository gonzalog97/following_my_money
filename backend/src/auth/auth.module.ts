import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from '../categories/categories.module'; // Importa CategoriesModule

@Module({
  imports: [
    PassportModule,
    UsersModule, // Importa el módulo de usuarios
    CategoriesModule, // Asegúrate de importar el módulo de categorías
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // Ajusta el tiempo de expiración del JWT
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy debería estar aquí
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
