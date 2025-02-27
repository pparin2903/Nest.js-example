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
exports.OusService = void 0;
const common_1 = require("@nestjs/common");
const ous_entity_1 = require("./ous.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let OusService = class OusService {
    constructor(ouRepository, jwtService) {
        this.ouRepository = ouRepository;
        this.jwtService = jwtService;
    }
    async findOus() {
        return this.ouRepository.find();
    }
    async findOu(id) {
        const ou = await this.ouRepository.findOne({ where: { id } });
        if (!ou) {
            throw new Error(`Data Not Found!`);
        }
        return ou;
    }
    async createOu(ou) {
        if (!ou.ou_code) {
            throw new common_1.HttpException({ message: `ou_code can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!ou.ou_name) {
            throw new common_1.HttpException({ message: `ou_name can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (typeof ou.ou_status !== 'boolean') {
            throw new common_1.HttpException({ message: `ou_status can't be string` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.ouRepository.save(ou);
    }
    async updateOu(id, ou) {
        await this.ouRepository.update(id, ou);
        const ouData = await this.ouRepository.findOne({ where: { id } });
        if (!ouData) {
            throw new Error(`Data Not Found!`);
        }
        return ouData;
    }
    async deleteOu(id) {
        await this.ouRepository.delete(id);
    }
    async findOuByUser(token) {
        const decoded = this.jwtService.decode(token);
        const ou_data = await this.ouRepository.query(`
        SELECT
          ou.ou_code,
          ou.ou_name
        FROM ous ou
        LEFT JOIN user_details ud ON ou.id = ud.ou_id
        WHERE ou_status IS TRUE AND ud.user_id = ?
      `, [decoded.id]);
        if (!ou_data) {
            throw new Error(`Data Not Found!`);
        }
        return ou_data;
    }
};
exports.OusService = OusService;
exports.OusService = OusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ous_entity_1.Ou)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], OusService);
//# sourceMappingURL=ous.service.js.map