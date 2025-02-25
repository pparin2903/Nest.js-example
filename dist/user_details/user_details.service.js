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
exports.UserDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_details_entity_1 = require("./user_details.entity");
const typeorm_2 = require("typeorm");
let UserDetailsService = class UserDetailsService {
    constructor(userDetailRepository) {
        this.userDetailRepository = userDetailRepository;
    }
    async findUserDetails() {
        return this.userDetailRepository.find();
    }
    async findUserDetail(id) {
        const userDetail = await this.userDetailRepository.findOne({
            where: { id },
        });
        if (!userDetail) {
            throw new Error(`Data Not Found!`);
        }
        return userDetail;
    }
    async createUserDetail(user_detail) {
        if (!user_detail.user_id) {
            throw new common_1.HttpException({ message: `user_id can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user_detail.ou_id) {
            throw new common_1.HttpException({ message: `ou_id can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user_detail.role_id) {
            throw new common_1.HttpException({ message: `role_id can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user_detail.user_detail_status) {
            throw new common_1.HttpException({ message: `user_detail_status can't be string` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.userDetailRepository.save(user_detail);
    }
    async updateUserDetail(id, user_detail) {
        await this.userDetailRepository.update(id, user_detail);
        const userDetailData = await this.userDetailRepository.findOne({
            where: { id },
        });
        if (!userDetailData) {
            throw new Error(`Data Not Found!`);
        }
        return userDetailData;
    }
    async deleteUserDetail(id) {
        await this.userDetailRepository.delete(id);
    }
};
exports.UserDetailsService = UserDetailsService;
exports.UserDetailsService = UserDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_details_entity_1.UserDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserDetailsService);
//# sourceMappingURL=user_details.service.js.map