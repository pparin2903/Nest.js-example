import { MenusService } from './menus.service';
import { Menu } from './menus.entity';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    findMenus(): Promise<Menu[]>;
    findMenu(id: number): Promise<Menu>;
    createMenu(menu: Menu): Promise<Menu>;
    updateMenu(id: number, role: Menu): Promise<Menu>;
    deleteMenu(id: number): Promise<void>;
}
