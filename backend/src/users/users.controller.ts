import { Controller, Get, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User as UserEntity } from '../database/entities/user.entity';
import { User } from '../common/decorators/user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return user;
  }

  @Put('profile')
  updateProfile(@User() user: UserEntity, @Body() updateData: Partial<UserEntity>) {
    return this.usersService.updateUser(user.id, updateData);
  }

  @Delete('profile')
  deactivateProfile(@User() user: UserEntity): Promise<void> {
    return this.usersService.deactivateUser(user.id);
  }
}
