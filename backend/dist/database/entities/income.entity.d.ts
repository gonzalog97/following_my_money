import { User } from './user.entity';
import { Category } from './category.entity';
export declare class Income {
    id: number;
    amount: number;
    description: string;
    date: Date;
    user: User;
    category: Category;
}
