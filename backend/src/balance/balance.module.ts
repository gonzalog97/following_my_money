import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { Transaction } from '../database/entities/transaction.entity';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    TransactionsModule,
  ],
  providers: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}
