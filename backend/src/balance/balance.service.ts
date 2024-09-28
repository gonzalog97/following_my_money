import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async getBalance(userId: number): Promise<number> {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId } },
      select: ['amount', 'type'], // Optimización: solo obtenemos los campos necesarios
    });

    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  }

  async getFinancialSummary(userId: number): Promise<any> {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: userId } },
      select: ['amount', 'type'], // Optimización: solo obtenemos los campos necesarios
    });

    const totalIncome = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpense = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
}
