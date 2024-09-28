import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { Income } from '../database/entities/income.entity';
import { User } from '../common/decorators/user.decorator';  // Decorador @User()

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  createIncome(
    @User() user,  // Utilizamos el decorador para obtener el usuario autenticado
    @Body() createIncomeDto: { categoryId: number, amount: number, description: string, date: Date },
  ): Promise<Income> {
    return this.incomesService.createIncome(user.id, createIncomeDto.categoryId, createIncomeDto.amount, createIncomeDto.description, createIncomeDto.date);
  }

  @Get()
  getIncomes(@User() user): Promise<Income[]> {
    return this.incomesService.findAllByUser(user.id);
  }

  @Delete(':id')
  deleteIncome(@Param('id') id: number, @User() user): Promise<void> {
    return this.incomesService.deleteIncome(id, user.id);
  }
}
