import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../database/entities/category.entity';
import { User } from '../common/decorators/user.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';  // Importamos el DTO

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(
    @User() user,  // Utilizamos el decorador para obtener el usuario autenticado
    @Body() createCategoryDto: CreateCategoryDto,  // Usamos el DTO para validar los datos
  ): Promise<Category> {
    return this.categoriesService.createUserCategory(user.id, createCategoryDto.name, createCategoryDto.type);
  }

  @Get()
  getCategories(@User() user): Promise<Category[]> {
    return this.categoriesService.findAllByUser(user.id);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number, @User() user) {
    return this.categoriesService.deleteCategory(id, user.id);
  }
}
