import { Controller, Get, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getBalance(@User() user): Promise<number> {
    return this.balanceService.getBalance(user.id);
  }
  @Get('summary')
getFinancialSummary(@User() user): Promise<any> {
  return this.balanceService.getFinancialSummary(user.id);
}

}
