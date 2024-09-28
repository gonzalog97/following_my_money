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
exports.IncomesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const income_entity_1 = require("../database/entities/income.entity");
const category_entity_1 = require("../database/entities/category.entity");
const user_entity_1 = require("../database/entities/user.entity");
let IncomesService = class IncomesService {
    constructor(incomeRepository, categoryRepository, userRepository) {
        this.incomeRepository = incomeRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    async createIncome(userId, categoryId, amount, description, date) {
        const category = await this.categoryRepository.findOne({
            where: [
                { id: categoryId, isDefault: true },
                { id: categoryId, user: { id: userId } },
            ],
        });
        if (!category) {
            throw new Error('Categoría no válida');
        }
        const newIncome = this.incomeRepository.create({
            amount,
            description,
            date,
            user: { id: userId },
            category,
        });
        return this.incomeRepository.save(newIncome);
    }
    async findIncomesByUser(userId) {
        return this.incomeRepository.find({ where: { user: { id: userId } } });
    }
    async findAllByUser(userId) {
        return this.incomeRepository.find({ where: { user: { id: userId } } });
    }
    async deleteIncome(id, userId) {
        const income = await this.incomeRepository.findOne({ where: { id, user: { id: userId } } });
        if (!income) {
            throw new Error('Ingreso no encontrado');
        }
        await this.incomeRepository.delete(id);
    }
};
exports.IncomesService = IncomesService;
exports.IncomesService = IncomesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(income_entity_1.Income)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], IncomesService);
//# sourceMappingURL=incomes.service.js.map