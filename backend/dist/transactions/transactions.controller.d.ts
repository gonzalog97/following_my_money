import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    createTransaction(user: any, createTransactionDto: CreateTransactionDto): Promise<import("../database/entities/transaction.entity").Transaction>;
    findAllTransactions(user: any): Promise<import("../database/entities/transaction.entity").Transaction[]>;
    deleteTransaction(id: number, user: any): Promise<void>;
}
