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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const achievement_entity_1 = require("../database/entities/achievement.entity");
const bcrypt = require("bcrypt");
const cron = require("node-cron");
let UsersService = class UsersService {
    constructor(userRepository, achievementRepository) {
        this.userRepository = userRepository;
        this.achievementRepository = achievementRepository;
        cron.schedule('0 0 * * *', () => {
            this.removeInactiveUsers();
        });
        cron.schedule('0 0 * * *', () => {
            this.checkBirthdays();
        });
    }
    async findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async createUser(username, email, password) {
        const newUser = this.userRepository.create({ username, email, password });
        return this.userRepository.save(newUser);
    }
    async updateUser(id, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        await this.userRepository.update(id, updateData);
        return this.userRepository.findOne({ where: { id } });
    }
    async deactivateUser(id) {
        await this.userRepository.update(id, { isActive: false, deletedAt: new Date() });
    }
    async removeUser(id) {
        await this.userRepository.delete(id);
    }
    async awardPoints(userId, points) {
        const user = await this.findOne(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.points += points;
        await this.userRepository.save(user);
        if (user.points >= 100) {
            await this.unlockAchievement(userId, 'Logro de 100 puntos');
        }
    }
    async unlockAchievement(userId, title) {
        const user = await this.findOne(userId);
        const achievement = this.achievementRepository.create({
            title,
            description: `Felicidades, ${user.firstName}, has desbloqueado el logro: ${title}`,
            user,
        });
        await this.achievementRepository.save(achievement);
    }
    async getUserAchievements(userId) {
        const user = await this.findOne(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return this.achievementRepository.find({ where: { user: { id: userId } } });
    }
    async removeInactiveUsers() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const usersToDelete = await this.userRepository.find({
            where: {
                isActive: false,
                deletedAt: (0, typeorm_2.LessThan)(oneMonthAgo),
            },
        });
        for (const user of usersToDelete) {
            await this.removeUser(user.id);
        }
    }
    async checkBirthdays() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const usersWithBirthday = await this.userRepository.createQueryBuilder('user')
            .where('EXTRACT(MONTH FROM user.birthDate) = :month', { month })
            .andWhere('EXTRACT(DAY FROM user.birthDate) = :day', { day })
            .getMany();
        for (const user of usersWithBirthday) {
            console.log(`¡Feliz cumpleaños, ${user.firstName}! 🎉`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(achievement_entity_1.Achievement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map