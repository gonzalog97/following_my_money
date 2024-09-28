import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Método para crear las categorías por defecto si no existen
  async createDefaultCategories(): Promise<void> {
    const defaultCategories = [
      { name: 'Alimentación', type: 'expense', isDefault: true },
      { name: 'Transporte', type: 'expense', isDefault: true },
      { name: 'Entretenimiento', type: 'expense', isDefault: true },
      { name: 'Salario', type: 'income', isDefault: true },
      { name: 'Inversiones', type: 'income', isDefault: true },
    ];

    for (const categoryData of defaultCategories) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: categoryData.name, isDefault: true },
      });
      if (!existingCategory) {
        const newCategory = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(newCategory);
      }
    }
  }

  // Método para encontrar las categorías de un usuario
  async findAllByUser(userId: number): Promise<Category[]> {
    return this.categoryRepository.find({ where: { user: { id: userId } } });
  }

  // Método para crear una nueva categoría personalizada por el usuario
  async createUserCategory(userId: number, name: string, type: string): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      name,
      type,
      isDefault: false,
      user: { id: userId },
    });
    return this.categoryRepository.save(newCategory);
  }

  // Método para eliminar una categoría
  async deleteCategory(categoryId: number, userId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId, user: { id: userId } } });
    if (!category) {
      throw new Error('Categoría no encontrada o no pertenece al usuario');
    }
    await this.categoryRepository.delete(categoryId);
  }
}
