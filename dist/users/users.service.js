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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUsers() {
        return this.userRepository.find();
    }
    async findUser(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`Data Not Found!`);
        }
        return user;
    }
    async findByUsername(user_name, password) {
        const user = await this.userRepository.query(`
        SELECT 
          us.id, 
          us.user_name,
          us.email,
          us.first_name,
          us.last_name,
          us.id,
	        r.role_code, 
          ou.ou_code
        FROM users us 
        LEFT JOIN user_details usd ON us.id = usd.user_id
        LEFT JOIN roles r ON usd.role_id = r.id
        LEFT JOIN ous ou ON usd.ou_id = ou.id
        WHERE user_name = ? AND password = ? AND us.user_status IS TRUE LIMIT 1
      `, [user_name, password]);
        if (!user) {
            throw new Error(`Data Not Found!`);
        }
        return user[0];
    }
    async createUser(user) {
        if (!user.user_name) {
            throw new common_1.HttpException({ message: `user_name can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user.password) {
            throw new common_1.HttpException({ message: `password can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user.email) {
            throw new common_1.HttpException({ message: `email can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user.first_name) {
            throw new common_1.HttpException({ message: `first_name can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!user.last_name) {
            throw new common_1.HttpException({ message: `last_name can't be null` }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user.user_status = true;
        user.update_by = 'User';
        return this.userRepository.save(user);
    }
    async updateUser(id, user) {
        await this.userRepository.update(id, user);
        const userData = await this.userRepository.findOne({ where: { id } });
        if (!userData) {
            throw new Error(`Data Not Found!`);
        }
        return userData;
    }
    async deleteUser(id) {
        await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map