import { User } from './user.entity';
export declare class Category {
    id: number;
    name: string;
    type: string;
    isDefault: boolean;
    user: User | null;
}
