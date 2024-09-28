import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from '../database/entities/income.entity';
import { Category } from '../database/entities/category.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createIncome(userId: number, categoryId: number, amount: number, description: string, date: Date): Promise<Income> {
    const category = await this.categoryRepository.findOne({
      where: [
        { id: categoryId, isDefault: true },
        { id: categoryId, user: { id: userId } },
      ],
    });

    if (!category) {
      throw new Error('Categoría no válida');
    }

    const newIncome = this.incomeRepository.create({
      amount,
      description,
      date,
      user: { id: userId },
      category,
    });

    return this.incomeRepository.save(newIncome);
  }

  async findIncomesByUser(userId: number): Promise<Income[]> {
    return this.incomeRepository.find({ where: { user: { id: userId } } });
  }
  async findAllByUser(userId: number): Promise<Income[]> {
    return this.incomeRepository.find({ where: { user: { id: userId } } });
  }

  async deleteIncome(id: number, userId: number): Promise<void> {
    const income = await this.incomeRepository.findOne({ where: { id, user: { id: userId } } });
    if (!income) {
      throw new Error('Ingreso no encontrado');
    }
    await this.incomeRepository.delete(id);
  }
}
