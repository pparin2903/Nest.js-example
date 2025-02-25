import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error(`Data Not Found!`);
    }
    return role;
  }

  async createRole(role: Role): Promise<Role> {
    if (!role.role_code) {
        throw new HttpException(
          { message: `role_code can't be null` },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    if (!role.role_name) {
      throw new HttpException(
        { message: `role_name can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.roleRepository.save(role);
  }

  async updateRole(id: number, role: Partial<Role>): Promise<Role> {
    await this.roleRepository.update(id, role);
    const roleData = await this.roleRepository.findOne({ where: { id } });
    if (!roleData) {
      throw new Error(`Data Not Found!`);
    }
    return roleData;
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
