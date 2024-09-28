import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['income', 'expense'])
  @IsNotEmpty()
  type: 'income' | 'expense';
}
