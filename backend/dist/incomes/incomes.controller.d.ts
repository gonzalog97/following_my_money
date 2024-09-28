import { IncomesService } from './incomes.service';
import { Income } from '../database/entities/income.entity';
export declare class IncomesController {
    private readonly incomesService;
    constructor(incomesService: IncomesService);
    createIncome(user: any, createIncomeDto: {
        categoryId: number;
        amount: number;
        description: string;
        date: Date;
    }): Promise<Income>;
    getIncomes(user: any): Promise<Income[]>;
    deleteIncome(id: number, user: any): Promise<void>;
}
