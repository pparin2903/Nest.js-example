import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { HttpModule } from '@nestjs/axios';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/menus.entity';
import { RoleDetailsModule } from './role_details/role_details.module';
import { RoleDetail } from './role_details/role_details.entity';
import { HelpdeskGateway } from './helpdesk/helpdesk.gateway';
import { HelpdeskService } from './helpdesk/helpdesk.service';
import { OtpModule } from './otp/otp.module';
import { OtpService } from './otp/otp.service';
import { OrganizationModule } from './organization/organization.module';
import { DepartmentModule } from './department/department.module';
import { OrganizationDetailModule } from './organization_detail/organization_detail.module';
import { Organization } from './organization/organization.entity';
import { OrganizationDetail } from './organization_detail/organization_detail.entity';
import { Department } from './department/department.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          User,
          Role,
          Menu,
          RoleDetail,
          Organization,
          OrganizationDetail,
          Department,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    UsersModule,
    RolesModule,
    AuthModule,
    MenusModule,
    RoleDetailsModule,
    OtpModule,
    OrganizationModule,
    DepartmentModule,
    OrganizationDetailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HelpdeskGateway,
    HelpdeskService,
    OtpService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
