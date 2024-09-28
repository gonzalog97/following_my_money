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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../database/entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async createTransaction(userId, amount, type, description, date) {
        if (!amount || !type || !date) {
            throw new Error('Faltan campos obligatorios para crear la transacción');
        }
        const newTransaction = this.transactionRepository.create({
            amount,
            type,
            description,
            date,
            user: { id: userId },
        });
        return this.transactionRepository.save(newTransaction);
    }
    async findAllByUser(userId) {
        return this.transactionRepository.find({ where: { user: { id: userId } } });
    }
    async deleteTransaction(transactionId, userId) {
        const transaction = await this.transactionRepository.findOne({ where: { id: transactionId, user: { id: userId } } });
        if (!transaction) {
            throw new Error('Transacción no encontrada o no pertenece al usuario');
        }
        await this.transactionRepository.delete(transactionId);
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map