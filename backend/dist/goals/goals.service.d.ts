import { Repository } from 'typeorm';
import { Goal } from '../database/entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
export declare class GoalsService {
    private readonly goalRepository;
    constructor(goalRepository: Repository<Goal>);
    createGoal(userId: number, createGoalDto: CreateGoalDto): Promise<Goal>;
    getGoalsByUser(userId: number): Promise<Goal[]>;
    deleteGoal(goalId: number, userId: number): Promise<void>;
}
