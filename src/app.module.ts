import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { OusModule } from './ous/ous.module';
import { Role } from './roles/roles.entity';
import { Ou } from './ous/ous.entity';
import { UserDetail } from './user_details/user_details.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { HttpModule } from '@nestjs/axios';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/menus.entity';
import { RoleDetailsModule } from './role_details/role_details.module';
import { RoleDetail } from './role_details/role_details.entity';

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
        entities: [User, Role, Ou, UserDetail, Menu, RoleDetail],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    UsersModule,
    RolesModule,
    OusModule,
    AuthModule,
    MenusModule,
    MenusModule,
    RoleDetailsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
