import { Module } from '@nestjs/common';
import { UserDetailsService } from './user_details.service';
import { UserDetailsController } from './user_details.controller';
import { UserDetail } from './user_details.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail])],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
   exports: [UserDetailsService],
})
export class UserDetailsModule {}
