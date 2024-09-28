"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../database/entities/transaction.entity");
let BalanceService = class BalanceService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async getBalance(userId) {
        const transactions = await this.transactionRepository.find({
            where: { user: { id: userId } },
            select: ['amount', 'type'],
        });
        return transactions.reduce((acc, transaction) => {
            return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
    }
    async getFinancialSummary(userId) {
        const transactions = await this.transactionRepository.find({
            where: { user: { id: userId } },
            select: ['amount', 'type'],
        });
        const totalIncome = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalExpense = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }
};
exports.BalanceService = BalanceService;
exports.BalanceService = BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BalanceService);
//# sourceMappingURL=balance.service.js.map