import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  createTransaction(@User() user, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(
      user.id,
      createTransactionDto.amount,
      createTransactionDto.type,
      createTransactionDto.description,
      new Date(createTransactionDto.date),  // Convertimos el string a Date
    );
  }

  @Get()
  findAllTransactions(@User() user) {
    return this.transactionsService.findAllByUser(user.id);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: number, @User() user) {
    return this.transactionsService.deleteTransaction(id, user.id);
  }
}
