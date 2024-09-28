import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { Income } from '../database/entities/income.entity';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Income, User, Category])  // Importamos las entidades necesarias
  ],
  providers: [IncomesService],  // Registramos el servicio de ingresos
  controllers: [IncomesController],  // Registramos el controlador de ingresos
  exports: [IncomesService],  // Exportamos el servicio para que pueda ser usado en otros módulos si es necesario
})
export class IncomesModule {}
