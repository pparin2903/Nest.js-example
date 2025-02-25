import { Module } from '@nestjs/common';
import { RoleDetailsService } from './role_details.service';
import { RoleDetailsController } from './role_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleDetail } from './role_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleDetail])],
  controllers: [RoleDetailsController],
  providers: [RoleDetailsService],
  exports: [RoleDetailsService],
})
export class RoleDetailsModule {}
