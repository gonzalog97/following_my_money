import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from '../database/entities/achievement.entity';
import { AchievementsService } from './achievements.service'; // Servicio opcional
import { AchievementsController } from './achievements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  providers: [AchievementsService], // Asegúrate de tener un servicio si es necesario
  controllers: [AchievementsController],
})
export class AchievementsModule {}
