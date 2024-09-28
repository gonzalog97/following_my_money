import { Repository } from 'typeorm';
import { Achievement } from '../database/entities/achievement.entity';
export declare class AchievementsService {
    private readonly achievementRepository;
    constructor(achievementRepository: Repository<Achievement>);
    assignAchievementToUser(userId: number, title: string, description: string): Promise<Achievement>;
    getUserAchievements(userId: number): Promise<Achievement[]>;
}
