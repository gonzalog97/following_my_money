import { Repository } from 'typeorm';
import { Expense } from '../database/entities/expense.entity';
import { Category } from '../database/entities/category.entity';
import { User } from '../database/entities/user.entity';
export declare class ExpensesService {
    private readonly expenseRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    constructor(expenseRepository: Repository<Expense>, categoryRepository: Repository<Category>, userRepository: Repository<User>);
    createExpense(userId: number, categoryId: number, amount: number, description: string, date: Date): Promise<Expense>;
    findAllByUser(userId: number): Promise<Expense[]>;
    findExpensesByUser(userId: number): Promise<Expense[]>;
    deleteExpense(id: number, userId: number): Promise<void>;
}
