import { BalanceService } from './balance.service';
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    getBalance(user: any): Promise<number>;
    getFinancialSummary(user: any): Promise<any>;
}
