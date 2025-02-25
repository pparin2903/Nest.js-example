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
exports.RoleDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_details_entity_1 = require("./role_details.entity");
let RoleDetailsService = class RoleDetailsService {
    constructor(roleDetailRepository) {
        this.roleDetailRepository = roleDetailRepository;
    }
    async findRoleDetails() {
        return this.roleDetailRepository.find();
    }
    async findRoleDetail(id) {
        const roleDetail = await this.roleDetailRepository.findOne({
            where: { id },
        });
        if (!roleDetail) {
            throw new Error(`Data Not Found!`);
        }
        return roleDetail;
    }
    async createRoleDetail(role_detail) {
        if (!role_detail.role_id) {
            throw new common_1.HttpException({ message: `role_id can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!role_detail.menu_id) {
            throw new common_1.HttpException({ message: `menu_id can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.roleDetailRepository.save(role_detail);
    }
    async updateRoleDetail(id, role_detail) {
        await this.roleDetailRepository.update(id, role_detail);
        const roleDetailData = await this.roleDetailRepository.findOne({
            where: { id },
        });
        if (!roleDetailData) {
            throw new Error(`Data Not Found!`);
        }
        return roleDetailData;
    }
    async deleteUserDetail(id) {
        await this.roleDetailRepository.delete(id);
    }
};
exports.RoleDetailsService = RoleDetailsService;
exports.RoleDetailsService = RoleDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_details_entity_1.RoleDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleDetailsService);
//# sourceMappingURL=role_details.service.js.map