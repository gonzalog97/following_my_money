import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from '../database/entities/transaction.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => TypeOrmModule.forFeature([Transaction])), // Usamos forwardRef para evitar ciclos de dependencias
    forwardRef(() => UsersModule), // Si necesitas hacer referencia al módulo de usuarios
  ],
  providers: [TransactionsService],
  controllers: [TransactionsController],
  exports: [TransactionsService, TypeOrmModule], // Exportamos también TypeOrmModule para que TransactionRepository esté disponible en otros módulos
})
export class TransactionsModule {}
