import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from '../database/entities/expense.entity';
import { User } from '../common/decorators/user.decorator';  // Decorador @User()

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  createExpense(
    @User() user,  // Utilizamos el decorador para obtener el usuario autenticado
    @Body() createExpenseDto: { categoryId: number, amount: number, description: string, date: Date },
  ): Promise<Expense> {
    return this.expensesService.createExpense(user.id, createExpenseDto.categoryId, createExpenseDto.amount, createExpenseDto.description, createExpenseDto.date);
  }

  @Get()
  getExpenses(@User() user): Promise<Expense[]> {
    return this.expensesService.findAllByUser(user.id);
  }

  @Delete(':id')
  deleteExpense(@Param('id') id: number, @User() user): Promise<void> {
    return this.expensesService.deleteExpense(id, user.id);
  }
}
