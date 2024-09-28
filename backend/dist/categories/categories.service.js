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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../database/entities/category.entity");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async createDefaultCategories() {
        const defaultCategories = [
            { name: 'Alimentación', type: 'expense', isDefault: true },
            { name: 'Transporte', type: 'expense', isDefault: true },
            { name: 'Entretenimiento', type: 'expense', isDefault: true },
            { name: 'Salario', type: 'income', isDefault: true },
            { name: 'Inversiones', type: 'income', isDefault: true },
        ];
        for (const categoryData of defaultCategories) {
            const existingCategory = await this.categoryRepository.findOne({
                where: { name: categoryData.name, isDefault: true },
            });
            if (!existingCategory) {
                const newCategory = this.categoryRepository.create(categoryData);
                await this.categoryRepository.save(newCategory);
            }
        }
    }
    async findAllByUser(userId) {
        return this.categoryRepository.find({ where: { user: { id: userId } } });
    }
    async createUserCategory(userId, name, type) {
        const newCategory = this.categoryRepository.create({
            name,
            type,
            isDefault: false,
            user: { id: userId },
        });
        return this.categoryRepository.save(newCategory);
    }
    async deleteCategory(categoryId, userId) {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId, user: { id: userId } } });
        if (!category) {
            throw new Error('Categoría no encontrada o no pertenece al usuario');
        }
        await this.categoryRepository.delete(categoryId);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map