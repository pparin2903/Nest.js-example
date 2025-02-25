import { Menu } from './menus.entity';
import { Repository } from 'typeorm';
export declare class MenusService {
    private menuRepository;
    constructor(menuRepository: Repository<Menu>);
    findMenus(): Promise<Menu[]>;
    findMenu(id: number): Promise<Menu>;
    createMenu(menu: Menu): Promise<Menu>;
    updateMenu(id: number, ou: Partial<Menu>): Promise<Menu>;
    deleteMenu(id: number): Promise<void>;
}
