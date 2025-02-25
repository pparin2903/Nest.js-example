import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDetail } from './role_details.entity';

@Injectable()
export class RoleDetailsService {
  constructor(
    @InjectRepository(RoleDetail)
    private roleDetailRepository: Repository<RoleDetail>,
  ) {}

  async findRoleDetails(): Promise<RoleDetail[]> {
    return this.roleDetailRepository.find();
  }

  async findRoleDetail(id: number): Promise<RoleDetail> {
    const roleDetail = await this.roleDetailRepository.findOne({
      where: { id },
    });
    if (!roleDetail) {
      throw new Error(`Data Not Found!`);
    }
    return roleDetail;
  }

  async createRoleDetail(role_detail: RoleDetail): Promise<RoleDetail> {
    if (!role_detail.role_id) {
      throw new HttpException(
        { message: `role_id can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!role_detail.menu_id) {
      throw new HttpException(
        { message: `menu_id can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.roleDetailRepository.save(role_detail);
  }

  async updateRoleDetail(
    id: number,
    role_detail: Partial<RoleDetail>,
  ): Promise<RoleDetail> {
    await this.roleDetailRepository.update(id, role_detail);
    const roleDetailData = await this.roleDetailRepository.findOne({
      where: { id },
    });
    if (!roleDetailData) {
      throw new Error(`Data Not Found!`);
    }
    return roleDetailData;
  }

  async deleteUserDetail(id: number): Promise<void> {
    await this.roleDetailRepository.delete(id);
  }
}
