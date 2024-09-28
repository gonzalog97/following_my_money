import { ExpensesService } from './expenses.service';
import { Expense } from '../database/entities/expense.entity';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    createExpense(user: any, createExpenseDto: {
        categoryId: number;
        amount: number;
        description: string;
        date: Date;
    }): Promise<Expense>;
    getExpenses(user: any): Promise<Expense[]>;
    deleteExpense(id: number, user: any): Promise<void>;
}
