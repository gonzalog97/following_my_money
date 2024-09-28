import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';
import { Income } from './income.entity';
import { Goal } from './goal.entity';
import { Category } from './category.entity';
import { Achievement } from './achievement.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ default: 0 })
  points: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  expenses: Promise<Expense[]>;

  @OneToMany(() => Income, (income) => income.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  incomes: Promise<Income[]>;

  @OneToMany(() => Goal, (goal) => goal.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  goals: Promise<Goal[]>;

  @OneToMany(() => Achievement, (achievement) => achievement.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  achievements: Promise<Achievement[]>;

  @OneToMany(() => Category, (category) => category.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  categories: Promise<Category[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.user, { lazy: true, cascade: true, onDelete: 'CASCADE' })
  transactions: Promise<Transaction[]>;
}
