import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './roles.decorator';
import { UsersService } from 'src/users/users.service';
import { UserState } from 'src/enum/config.enum';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
// import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly loginAPI: any;

  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
    // private readonly httpService: HttpService,
    // private readonly configService: ConfigService,
  ) {
    // this.loginAPI = this.configService.get<string>('LOGIN_EMPLOYEE');
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.user_name,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.login(user);
    this.userService.updateUserState(token.access_token, UserState.ONLINE);
    return token;
  }
}
