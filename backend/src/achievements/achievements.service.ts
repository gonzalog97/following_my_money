import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Achievement } from '../database/entities/achievement.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async assignAchievementToUser(userId: number, title: string, description: string): Promise<Achievement> {
    const newAchievement = this.achievementRepository.create({
      title,
      description,
      user: { id: userId }, // Relacionamos el logro con el usuario
    });
    return this.achievementRepository.save(newAchievement);
  }

  async getUserAchievements(userId: number): Promise<Achievement[]> {
    return this.achievementRepository.find({ where: { user: { id: userId } } });
  }
}
