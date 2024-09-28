// goal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })  // Aseguramos que el campo no permita valores nulos
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  targetAmount: number;

  @Column()
  deadline: Date;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
