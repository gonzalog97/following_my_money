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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const expense_entity_1 = require("./expense.entity");
const income_entity_1 = require("./income.entity");
const goal_entity_1 = require("./goal.entity");
const category_entity_1 = require("./category.entity");
const achievement_entity_1 = require("./achievement.entity");
const transaction_entity_1 = require("./transaction.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => expense_entity_1.Expense, (expense) => expense.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "expenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => income_entity_1.Income, (income) => income.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "incomes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => goal_entity_1.Goal, (goal) => goal.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => achievement_entity_1.Achievement, (achievement) => achievement.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (category) => category.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.user, { lazy: true, cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Promise)
], User.prototype, "transactions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map