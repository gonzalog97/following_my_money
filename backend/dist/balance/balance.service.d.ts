import { Repository } from 'typeorm';
import { Transaction } from '../database/entities/transaction.entity';
export declare class BalanceService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    getBalance(userId: number): Promise<number>;
    getFinancialSummary(userId: number): Promise<any>;
}
