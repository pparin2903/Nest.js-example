import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Menu } from './menus.entity';
import { UserRole } from 'src/enum/role.enum';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get()
  findMenus(): Promise<Menu[]> {
    return this.menusService.findMenus();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get(':id')
  findMenu(@Param('id') id: number): Promise<Menu> {
    return this.menusService.findMenu(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post()
  async createMenu(@Body() menu: Menu): Promise<Menu> {
    return await this.menusService.createMenu(menu);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Put(':id')
  updateMenu(@Param('id') id: number, @Body() role: Menu): Promise<Menu> {
    return this.menusService.updateMenu(id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete(':id')
  deleteMenu(@Param('id') id: number): Promise<void> {
    return this.menusService.deleteMenu(id);
  }
}
