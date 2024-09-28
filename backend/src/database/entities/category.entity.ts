import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // Tipo de categoría (ingreso, gasto, etc.)

  @Column({ default: false })
  isDefault: boolean; // Campo para identificar si la categoría es predefinida

  @ManyToOne(() => User, (user) => user.categories, { nullable: true })
  user: User | null; // Relación con usuario si es una categoría personalizada
}
