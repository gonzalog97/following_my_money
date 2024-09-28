import { Repository } from 'typeorm';
import { Income } from '../database/entities/income.entity';
import { Category } from '../database/entities/category.entity';
import { User } from '../database/entities/user.entity';
export declare class IncomesService {
    private readonly incomeRepository;
    private readonly categoryRepository;
    private readonly userRepository;
    constructor(incomeRepository: Repository<Income>, categoryRepository: Repository<Category>, userRepository: Repository<User>);
    createIncome(userId: number, categoryId: number, amount: number, description: string, date: Date): Promise<Income>;
    findIncomesByUser(userId: number): Promise<Income[]>;
    findAllByUser(userId: number): Promise<Income[]>;
    deleteIncome(id: number, userId: number): Promise<void>;
}
