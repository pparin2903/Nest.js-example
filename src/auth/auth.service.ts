import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user_name: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(user_name, password);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = user;
    return {
      user_name: payload.user_name,
      first_name: payload.first_name,
      last_name: payload.last_name,
      role_code: payload.role_code,
      access_token: this.jwtService.sign(payload),
    };
  }
}
