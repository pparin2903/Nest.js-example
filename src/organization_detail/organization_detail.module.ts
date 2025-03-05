import { Module } from '@nestjs/common';
import { OrganizationDetailService } from './organization_detail.service';
import { OrganizationDetailController } from './organization_detail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationDetail } from './organization_detail.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([OrganizationDetail]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
        },
      }),
    }),
  ],
  controllers: [OrganizationDetailController],
  providers: [OrganizationDetailService],
  exports: [OrganizationDetailService],
})
export class OrganizationDetailModule {}
