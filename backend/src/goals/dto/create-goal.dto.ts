import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  name: string;  // Cambiamos "title" por "name" para que coincida con la entidad

  @IsNumber()
  @IsNotEmpty()
  targetAmount: number;

  @IsDateString()  // Aceptamos fechas en formato ISO
  @IsNotEmpty()
  deadline: string;  // Lo dejamos como string para manejar bien la validación de fechas
}
