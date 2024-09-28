import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Achievement } from '../database/entities/achievement.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly achievementRepository;
    constructor(userRepository: Repository<User>, achievementRepository: Repository<Achievement>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    createUser(username: string, email: string, password: string): Promise<User>;
    updateUser(id: number, updateData: Partial<User>): Promise<User>;
    deactivateUser(id: number): Promise<void>;
    removeUser(id: number): Promise<void>;
    awardPoints(userId: number, points: number): Promise<void>;
    unlockAchievement(userId: number, title: string): Promise<void>;
    getUserAchievements(userId: number): Promise<Achievement[]>;
    removeInactiveUsers(): Promise<void>;
    checkBirthdays(): Promise<void>;
}
