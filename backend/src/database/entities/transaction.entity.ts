import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'varchar' }) // Cambiado a varchar para la base de datos
  type: string; // Puede ser 'income' o 'expense'

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: User;
}
