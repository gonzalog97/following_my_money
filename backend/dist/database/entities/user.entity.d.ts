import { Expense } from './expense.entity';
import { Income } from './income.entity';
import { Goal } from './goal.entity';
import { Category } from './category.entity';
import { Achievement } from './achievement.entity';
import { Transaction } from './transaction.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: Date;
    points: number;
    isActive: boolean;
    deletedAt: Date;
    expenses: Promise<Expense[]>;
    incomes: Promise<Income[]>;
    goals: Promise<Goal[]>;
    achievements: Promise<Achievement[]>;
    categories: Promise<Category[]>;
    transactions: Promise<Transaction[]>;
}
