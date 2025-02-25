import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async findMenus(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findMenu(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new Error(`Data Not Found!`);
    }
    return menu;
  }

  async createMenu(menu: Menu): Promise<Menu> {
    if (!menu.menu_code) {
      throw new HttpException(
        { message: `menu_code can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!menu.menu_name) {
      throw new HttpException(
        { message: `menu_name can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!menu.menu_path) {
      throw new HttpException(
        { message: `menu_path can't be null` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!menu.menu_status) {
      throw new HttpException(
        { message: `menu_status must be boolean` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return this.menuRepository.save(menu);
  }

  async updateMenu(id: number, ou: Partial<Menu>): Promise<Menu> {
    await this.menuRepository.update(id, ou);
    const menuData = await this.menuRepository.findOne({ where: { id } });
    if (!menuData) {
      throw new Error(`Data Not Found!`);
    }
    return menuData;
  }

  async deleteMenu(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }
}
