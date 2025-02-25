import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from './user_details.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetail)
    private userDetailRepository: Repository<UserDetail>,
  ) {}

  async findUserDetails(): Promise<UserDetail[]> {
    return this.userDetailRepository.find();
  }

  async findUserDetail(id: number): Promise<UserDetail> {
    const userDetail = await this.userDetailRepository.findOne({
      where: { id },
    });
    if (!userDetail) {
      throw new Error(`Data Not Found!`);
    }
    return userDetail;
  }

  async createUserDetail(user_detail: UserDetail): Promise<UserDetail> {
    if (!user_detail.user_id) {
      throw new HttpException(
        { message: `user_id can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user_detail.ou_id) {
      throw new HttpException(
        { message: `ou_id can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user_detail.role_id) {
      throw new HttpException(
        { message: `role_id can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!user_detail.user_detail_status) {
      throw new HttpException(
        { message: `user_detail_status can't be string` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.userDetailRepository.save(user_detail);
  }

  async updateUserDetail(
    id: number,
    user_detail: Partial<UserDetail>,
  ): Promise<UserDetail> {
    await this.userDetailRepository.update(id, user_detail);
    const userDetailData = await this.userDetailRepository.findOne({
      where: { id },
    });
    if (!userDetailData) {
      throw new Error(`Data Not Found!`);
    }
    return userDetailData;
  }

  async deleteUserDetail(id: number): Promise<void> {
    await this.userDetailRepository.delete(id);
  }
}
