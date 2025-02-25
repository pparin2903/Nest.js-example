"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menus_entity_1 = require("./menus.entity");
const typeorm_2 = require("typeorm");
let MenusService = class MenusService {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async findMenus() {
        return this.menuRepository.find();
    }
    async findMenu(id) {
        const menu = await this.menuRepository.findOne({ where: { id } });
        if (!menu) {
            throw new Error(`Data Not Found!`);
        }
        return menu;
    }
    async createMenu(menu) {
        if (!menu.menu_code) {
            throw new common_1.HttpException({ message: `menu_code can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!menu.menu_name) {
            throw new common_1.HttpException({ message: `menu_name can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!menu.menu_path) {
            throw new common_1.HttpException({ message: `menu_path can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!menu.menu_status) {
            throw new common_1.HttpException({ message: `menu_status must be boolean` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.menuRepository.save(menu);
    }
    async updateMenu(id, ou) {
        await this.menuRepository.update(id, ou);
        const menuData = await this.menuRepository.findOne({ where: { id } });
        if (!menuData) {
            throw new Error(`Data Not Found!`);
        }
        return menuData;
    }
    async deleteMenu(id) {
        await this.menuRepository.delete(id);
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menus_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenusService);
//# sourceMappingURL=menus.service.js.map