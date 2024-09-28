import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    createDefaultCategories(): Promise<void>;
    findAllByUser(userId: number): Promise<Category[]>;
    createUserCategory(userId: number, name: string, type: string): Promise<Category>;
    deleteCategory(categoryId: number, userId: number): Promise<void>;
}
