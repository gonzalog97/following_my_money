import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from '../database/entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';  // Importamos el DTO

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
  ) {}

  // Crear un objetivo usando el DTO directamente
  async createGoal(userId: number, createGoalDto: CreateGoalDto): Promise<Goal> {
    const newGoal = this.goalRepository.create({
      name: createGoalDto.name,  // Usamos "name" en lugar de "title"
      targetAmount: createGoalDto.targetAmount,
      deadline: createGoalDto.deadline,
      user: { id: userId },
    });
    return this.goalRepository.save(newGoal);
  }

  // Obtener todos los objetivos del usuario
  async getGoalsByUser(userId: number): Promise<Goal[]> {
    return this.goalRepository.find({ where: { user: { id: userId } } });
  }

  // Eliminar un objetivo
  async deleteGoal(goalId: number, userId: number): Promise<void> {
    const goal = await this.goalRepository.findOne({ where: { id: goalId, user: { id: userId } } });
    if (!goal) {
      throw new NotFoundException('Goal not found or does not belong to user');
    }
    await this.goalRepository.delete(goalId);
  }
}
