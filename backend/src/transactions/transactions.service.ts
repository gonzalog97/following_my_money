import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>, // Inyectamos el repositorio de transacciones
  ) {}

  async createTransaction(userId: number, amount: number, type: 'income' | 'expense', description: string, date: Date) {
    // Validar que todos los campos necesarios estén presentes
    if (!amount || !type || !date) {
      throw new Error('Faltan campos obligatorios para crear la transacción');
    }

    const newTransaction = this.transactionRepository.create({
      amount,
      type,
      description,
      date,
      user: { id: userId },
    });
    return this.transactionRepository.save(newTransaction);
  }

  async findAllByUser(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { user: { id: userId } } });
  }

  async deleteTransaction(transactionId: number, userId: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({ where: { id: transactionId, user: { id: userId } } });
    if (!transaction) {
      throw new Error('Transacción no encontrada o no pertenece al usuario');
    }
    await this.transactionRepository.delete(transactionId);
  }
}
