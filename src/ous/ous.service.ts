import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ou } from './ous.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OusService {
  constructor(
    @InjectRepository(Ou)
    private ouRepository: Repository<Ou>,
  ) {}

  async findOus(): Promise<Ou[]> {
    return this.ouRepository.find();
  }

  async findOu(id: number): Promise<Ou> {
    const ou = await this.ouRepository.findOne({ where: { id } });
    if (!ou) {
      throw new Error(`Data Not Found!`);
    }
    return ou;
  }

  async createOu(ou: Ou): Promise<Ou> {
    if (!ou.ou_code) {
      throw new HttpException(
        { message: `ou_code can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!ou.ou_name) {
      throw new HttpException(
        { message: `ou_name can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if(typeof ou.ou_status !== 'boolean'){
      throw new HttpException(
        { message: `ou_status can't be string` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.ouRepository.save(ou);
  }

  async updateOu(id: number, ou: Partial<Ou>): Promise<Ou> {
    await this.ouRepository.update(id, ou);
    const ouData = await this.ouRepository.findOne({ where: { id } });
    if (!ouData) {
      throw new Error(`Data Not Found!`);
    }
    return ouData;
  }

  async deleteOu(id: number): Promise<void> {
    await this.ouRepository.delete(id);
  }
}
