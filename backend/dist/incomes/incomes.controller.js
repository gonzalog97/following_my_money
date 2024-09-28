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
exports.IncomesController = void 0;
const common_1 = require("@nestjs/common");
const incomes_service_1 = require("./incomes.service");
const user_decorator_1 = require("../common/decorators/user.decorator");
let IncomesController = class IncomesController {
    constructor(incomesService) {
        this.incomesService = incomesService;
    }
    createIncome(user, createIncomeDto) {
        return this.incomesService.createIncome(user.id, createIncomeDto.categoryId, createIncomeDto.amount, createIncomeDto.description, createIncomeDto.date);
    }
    getIncomes(user) {
        return this.incomesService.findAllByUser(user.id);
    }
    deleteIncome(id, user) {
        return this.incomesService.deleteIncome(id, user.id);
    }
};
exports.IncomesController = IncomesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IncomesController.prototype, "createIncome", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomesController.prototype, "getIncomes", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], IncomesController.prototype, "deleteIncome", null);
exports.IncomesController = IncomesController = __decorate([
    (0, common_1.Controller)('incomes'),
    __metadata("design:paramtypes", [incomes_service_1.IncomesService])
], IncomesController);
//# sourceMappingURL=incomes.controller.js.map