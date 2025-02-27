import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserState } from './users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public, Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/enum/config.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('/update-state')
  updateUserState(@Req() req, @Body() payload: UserState): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization token');
    }
    const token = authHeader.split(' ')[1];
    return this.usersService.updateUserState(token, payload.user_state);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get()
  findUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get(':id')
  findUser(@Param('id') id: number): Promise<User> {
    return this.usersService.findUser(id);
  }

  @Public()
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
