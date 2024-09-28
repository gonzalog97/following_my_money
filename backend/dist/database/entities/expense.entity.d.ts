import { User } from './user.entity';
import { Category } from './category.entity';
export declare class Expense {
    id: number;
    amount: number;
    description: string;
    date: Date;
    user: User;
    category: Category;
}
