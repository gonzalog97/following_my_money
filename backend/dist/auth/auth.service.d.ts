import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { User } from '../database/entities/user.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly categoriesService;
    constructor(usersService: UsersService, jwtService: JwtService, categoriesService: CategoriesService);
    validateUser(username: string, pass: string): Promise<User | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
    register(username: string, email: string, password: string): Promise<User>;
}
