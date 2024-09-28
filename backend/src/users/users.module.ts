import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.entity';
import { Achievement } from '../database/entities/achievement.entity';
import { TransactionsModule } from '../transactions/transactions.module'; // Módulo de Transacciones
import { AchievementsService } from '../achievements/achievements.service'; // Servicio de logros
import { TransactionsService } from '../transactions/transactions.service'; // Servicio de transacciones

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Achievement]), // Entidades
    forwardRef(() => TransactionsModule), // Usamos forwardRef para evitar el ciclo de dependencias
  ],
  providers: [
    UsersService, // Servicio de usuarios
    AchievementsService, // Añadimos el servicio de logros para trabajar con los logros
    TransactionsService, // Añadimos el servicio de transacciones para gestionar el historial de transacciones
  ],
  controllers: [UsersController], // Controlador de usuarios
  exports: [UsersService], // Exportamos el servicio de usuarios para usarlo en otros módulos
})
export class UsersModule {}
