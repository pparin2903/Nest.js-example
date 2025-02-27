import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserState } from 'src/enum/config.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`Data Not Found!`);
    }
    return user;
  }

  async findByUsername(user_name: string, password: string): Promise<User> {
    const user = await this.userRepository.query(
      `
        SELECT 
          us.id, 
          us.user_name,
          us.email,
          us.first_name,
          us.last_name,
	        r.role_code
        FROM users us 
        LEFT JOIN user_details usd ON us.id = usd.user_id
        LEFT JOIN roles r ON usd.role_id = r.id
        WHERE user_name = ? AND password = ? AND us.user_status IS TRUE LIMIT 1
      `,
      [user_name, password],
    );
    if (!user) {
      throw new Error(`Data Not Found!`);
    }
    return user[0];
  }

  async createUser(user: User): Promise<User> {
    if (!user.user_name) {
      throw new HttpException(
        { message: `user_name can't be null` },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.password) {
      throw new HttpException(
        { message: `password can't be null` },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.email) {
      throw new HttpException(
        { message: `email can't be null` },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.first_name) {
      throw new HttpException(
        { message: `first_name can't be null` },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user.last_name) {
      throw new HttpException(
        { message: `last_name can't be null` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUserByUserName = await this.userRepository.findOne({
      where: { user_name: user.user_name },
    });
    if (existingUserByUserName) {
      throw new HttpException(
        { message: `user_name is already taken` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUserByEmail) {
      throw new HttpException(
        { message: `email is already taken` },
        HttpStatus.BAD_REQUEST,
      );
    }
    user.user_status = true;
    user.update_by = 'User';
    user.user_state = UserState.OFFLINE;
    return this.userRepository.save(user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const userData = await this.userRepository.findOne({ where: { id } });
    if (!userData) {
      throw new Error(`Data Not Found!`);
    }
    return userData;
  }

  async updateUserState(token: string, state: string) {
    const decoded = this.jwtService.decode(token);

    const response = await this.userRepository.query(
      `
        UPDATE users SET user_state = ? WHERE id = ?
      `,
      [state, decoded.id],
    );
    return response;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
