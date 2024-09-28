import { Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';
export declare class TransactionsService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    createTransaction(userId: number, amount: number, type: 'income' | 'expense', description: string, date: Date): Promise<Transaction>;
    findAllByUser(userId: number): Promise<Transaction[]>;
    deleteTransaction(transactionId: number, userId: number): Promise<void>;
}
