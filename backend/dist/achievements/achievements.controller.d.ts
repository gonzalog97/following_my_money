import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    getUserAchievements(userId: number): Promise<import("../database/entities/achievement.entity").Achievement[]>;
    assignAchievement(user: any, createAchievementDto: CreateAchievementDto): Promise<import("../database/entities/achievement.entity").Achievement>;
}
