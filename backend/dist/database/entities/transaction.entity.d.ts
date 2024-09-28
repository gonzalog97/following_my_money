import { User } from './user.entity';
export declare class Transaction {
    id: number;
    amount: number;
    type: string;
    description: string;
    date: Date;
    user: User;
}
