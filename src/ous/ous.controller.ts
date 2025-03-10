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
import { OusService } from './ous.service';
import { Ou } from './ous.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/enum/role.enum';

@Controller('ous')
export class OusController {
  constructor(private readonly ousService: OusService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get()
  findOus(): Promise<Ou[]> {
    return this.ousService.findOus();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get(':id')
  findOu(@Param('id') id: number): Promise<Ou> {
    return this.ousService.findOu(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Post()
  async createOu(@Body() ou: Ou): Promise<Ou> {
    return await this.ousService.createOu(ou);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Put(':id')
  updateOu(@Param('id') id: number, @Body() role: Ou): Promise<Ou> {
    return this.ousService.updateOu(id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete(':id')
  deleteOu(@Param('id') id: number): Promise<void> {
    return this.ousService.deleteOu(id);
  }
}
