import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './roles.decorator';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
// import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly loginAPI: any;

  constructor(
    private authService: AuthService,
    // private readonly httpService: HttpService,
    // private readonly configService: ConfigService,
  ) {
    // this.loginAPI = this.configService.get<string>('LOGIN_EMPLOYEE');
  }

  @Public()
  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(
      body.user_name,
      body.password,
      body.ou,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
