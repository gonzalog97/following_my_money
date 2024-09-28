import { CategoriesService } from './categories.service';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(user: any, createCategoryDto: CreateCategoryDto): Promise<Category>;
    getCategories(user: any): Promise<Category[]>;
    deleteCategory(id: number, user: any): Promise<void>;
}
