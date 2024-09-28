import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { Goal } from '../database/entities/goal.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal, User])  // Importamos las entidades necesarias
  ],
  providers: [GoalsService],  // Registramos el servicio de metas
  controllers: [GoalsController],  // Registramos el controlador de metas
  exports: [GoalsService],  // Exportamos el servicio para que pueda ser usado en otros módulos si es necesario
})
export class GoalsModule {}
