import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../database/entities/expense.entity';
import { Category } from '../database/entities/category.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createExpense(userId: number, categoryId: number, amount: number, description: string, date: Date): Promise<Expense> {
    const category = await this.categoryRepository.findOne({
      where: [
        { id: categoryId, isDefault: true },
        { id: categoryId, user: { id: userId } },
      ],
    });

    if (!category) {
      throw new Error('Categoría no válida');
    }

    const newExpense = this.expenseRepository.create({
      amount,
      description,
      date,
      user: { id: userId },
      category,
    });

    return this.expenseRepository.save(newExpense);
  }
  async findAllByUser(userId: number): Promise<Expense[]> {
    return this.expenseRepository.find({ where: { user: { id: userId } } });
  }

  async findExpensesByUser(userId: number): Promise<Expense[]> {
    return this.expenseRepository.find({ where: { user: { id: userId } } });
  }

  async deleteExpense(id: number, userId: number): Promise<void> {
    const expense = await this.expenseRepository.findOne({ where: { id, user: { id: userId } } });
    if (!expense) {
      throw new Error('Gasto no encontrado');
    }
    await this.expenseRepository.delete(id);
  }
}
