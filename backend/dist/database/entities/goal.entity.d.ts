import { User } from './user.entity';
export declare class Goal {
    id: number;
    name: string;
    targetAmount: number;
    deadline: Date;
    user: User;
}
