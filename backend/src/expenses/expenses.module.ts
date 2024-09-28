import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from '../database/entities/expense.entity';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, User, Category])  // Importamos las entidades necesarias
  ],
  providers: [ExpensesService],  // Registramos el servicio de gastos
  controllers: [ExpensesController],  // Registramos el controlador de gastos
  exports: [ExpensesService],  // Exportamos el servicio para que pueda ser usado en otros módulos si es necesario
})
export class ExpensesModule {}
