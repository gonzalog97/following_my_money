import { GoalsService } from './goals.service';
import { Goal } from '../database/entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    createGoal(user: any, createGoalDto: CreateGoalDto): Promise<Goal>;
    getGoals(user: any): Promise<Goal[]>;
    deleteGoal(id: number, user: any): Promise<void>;
}
