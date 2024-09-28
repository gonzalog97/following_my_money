import { IsNotEmpty, IsEnum, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(['income', 'expense'])
  @IsNotEmpty()
  type: 'income' | 'expense';

  @IsString()
  description?: string;

  @IsDateString()  // Cambiamos a IsDateString para aceptar fechas en formato ISO
  @IsNotEmpty()
  date: string;  // Cambiamos Date a string para manejar el formato de fecha correctamente
}
