"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const categories_module_1 = require("./categories/categories.module");
const expenses_module_1 = require("./expenses/expenses.module");
const incomes_module_1 = require("./incomes/incomes.module");
const goals_module_1 = require("./goals/goals.module");
const balance_module_1 = require("./balance/balance.module");
const transactions_module_1 = require("./transactions/transactions.module");
const achievements_module_1 = require("./achievements/achievements.module");
const user_entity_1 = require("./database/entities/user.entity");
const category_entity_1 = require("./database/entities/category.entity");
const expense_entity_1 = require("./database/entities/expense.entity");
const income_entity_1 = require("./database/entities/income.entity");
const goal_entity_1 = require("./database/entities/goal.entity");
const achievement_entity_1 = require("./database/entities/achievement.entity");
const transaction_entity_1 = require("./database/entities/transaction.entity");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const entities = [user_entity_1.User, category_entity_1.Category, expense_entity_1.Expense, income_entity_1.Income, goal_entity_1.Goal, achievement_entity_1.Achievement, transaction_entity_1.Transaction];
                    console.log("Entidades registradas:", entities);
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        entities: entities,
                        synchronize: true,
                        logging: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            expenses_module_1.ExpensesModule,
            incomes_module_1.IncomesModule,
            goals_module_1.GoalsModule,
            balance_module_1.BalanceModule,
            transactions_module_1.TransactionsModule,
            achievements_module_1.AchievementsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map