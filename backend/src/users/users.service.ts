import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Achievement } from '../database/entities/achievement.entity';
import * as bcrypt from 'bcrypt';
import * as cron from 'node-cron';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {
    // Cron job para eliminar usuarios inactivos
    cron.schedule('0 0 * * *', () => {
      this.removeInactiveUsers();
    });

    // Cron job para enviar notificaciones de cumpleaños
    cron.schedule('0 0 * * *', () => {
      this.checkBirthdays();
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    // No vuelvas a hashear la contraseña aquí, ya ha sido hasheada en el AuthService
    const newUser = this.userRepository.create({ username, email, password });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  async deactivateUser(id: number): Promise<void> {
    await this.userRepository.update(id, { isActive: false, deletedAt: new Date() });
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Otorgar puntos y logros
  async awardPoints(userId: number, points: number): Promise<void> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.points += points;
    await this.userRepository.save(user);

    // Verificar si se desbloquea un logro
    if (user.points >= 100) {
      await this.unlockAchievement(userId, 'Logro de 100 puntos');
    }
  }

  async unlockAchievement(userId: number, title: string): Promise<void> {
    const user = await this.findOne(userId);
    const achievement = this.achievementRepository.create({
      title,
      description: `Felicidades, ${user.firstName}, has desbloqueado el logro: ${title}`,
      user,
    });
    await this.achievementRepository.save(achievement);
  }

  // Obtener logros del usuario
  async getUserAchievements(userId: number): Promise<Achievement[]> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return this.achievementRepository.find({ where: { user: { id: userId } } });
  }

  // Eliminar usuarios inactivos después de un mes
  async removeInactiveUsers(): Promise<void> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const usersToDelete = await this.userRepository.find({
      where: {
        isActive: false,
        deletedAt: LessThan(oneMonthAgo),
      },
    });

    for (const user of usersToDelete) {
      await this.removeUser(user.id);
    }
  }

  // Verificar cumpleaños y enviar notificaciones
  async checkBirthdays(): Promise<void> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const usersWithBirthday = await this.userRepository.createQueryBuilder('user')
      .where('EXTRACT(MONTH FROM user.birthDate) = :month', { month })
      .andWhere('EXTRACT(DAY FROM user.birthDate) = :day', { day })
      .getMany();

    for (const user of usersWithBirthday) {
      console.log(`¡Feliz cumpleaños, ${user.firstName}! 🎉`);
      // Aquí podrías enviar un email o notificación push
    }
  }
}
