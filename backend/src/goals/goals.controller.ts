import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { Goal } from '../database/entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';  // Importamos el DTO
import { User } from '../common/decorators/user.decorator';  // Decorador @User()
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';  // Protección de rutas

@Controller('goals')
@UseGuards(JwtAuthGuard)  // Protegemos las rutas para que solo usuarios autenticados puedan acceder
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  createGoal(
    @User() user,  // Utilizamos el decorador para obtener el usuario autenticado
    @Body() createGoalDto: CreateGoalDto,  // Usamos el DTO para validar los datos
  ): Promise<Goal> {
    return this.goalsService.createGoal(user.id, createGoalDto);
  }

  @Get()
  getGoals(@User() user): Promise<Goal[]> {
    return this.goalsService.getGoalsByUser(user.id);
  }

  @Delete(':id')
  deleteGoal(@Param('id') id: number, @User() user): Promise<void> {
    return this.goalsService.deleteGoal(id, user.id);
  }
}
