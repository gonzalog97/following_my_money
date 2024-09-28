import { UsersService } from './users.service';
import { User as UserEntity } from '../database/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: UserEntity): UserEntity;
    updateProfile(user: UserEntity, updateData: Partial<UserEntity>): Promise<UserEntity>;
    deactivateProfile(user: UserEntity): Promise<void>;
}
