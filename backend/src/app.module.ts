import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { GoalsModule } from './goals/goals.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AchievementsModule } from './achievements/achievements.module';

import { User } from './database/entities/user.entity';
import { Category } from './database/entities/category.entity';
import { Expense } from './database/entities/expense.entity';
import { Income } from './database/entities/income.entity';
import { Goal } from './database/entities/goal.entity';
import { Achievement } from './database/entities/achievement.entity';
import { Transaction } from './database/entities/transaction.entity';

import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const entities = [User, Category, Expense, Income, Goal, Achievement, Transaction];
        console.log("Entidades registradas:", entities);
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: entities, // Asegúrate de incluir Transaction aquí
          synchronize: true, // Asegúrate de que esté habilitado para mantener el esquema actualizado
          logging: true, // Habilita los logs SQL para ver las consultas
        };
      },
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    IncomesModule,
    GoalsModule,
    BalanceModule,
    TransactionsModule,
    AchievementsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
