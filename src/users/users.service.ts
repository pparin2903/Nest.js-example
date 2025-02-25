import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async findByUsername(
    user_name: string,
    password: string,
    ou: string,
  ): Promise<User> {
    const user = await this.userRepository.query(
      `
        SELECT 
          us.id, 
          us.user_name,
          us.email,
          us.first_name,
          us.last_name,
          us.id,
	        r.role_code, 
          ou.ou_code
        FROM users us 
        LEFT JOIN user_details usd ON us.id = usd.user_id
        LEFT JOIN roles r ON usd.role_id = r.id
        LEFT JOIN ous ou ON usd.ou_id = ou.id
        WHERE user_name = ? AND password = ? AND us.user_status IS TRUE AND ou.ou_code = ? LIMIT 1
      `,
      [user_name, password, ou],
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user.password) {
      throw new HttpException(
        { message: `password can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user.email) {
      throw new HttpException(
        { message: `email can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user.first_name) {
      throw new HttpException(
        { message: `first_name can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user.last_name) {
      throw new HttpException(
        { message: `last_name can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    user.user_status = true;
    user.update_by = 'User';
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

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
