import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CreateAchievementDto } from './dto/create-achievement.dto'; // DTO opcional

@Controller('achievements')
@UseGuards(JwtAuthGuard)
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('user/:id')
  getUserAchievements(@Param('id') userId: number) {
    return this.achievementsService.getUserAchievements(userId);
  }

  @Post()
  assignAchievement(@User() user, @Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.assignAchievementToUser(
      user.id,
      createAchievementDto.title,
      createAchievementDto.description,
    );
  }
}
