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
exports.OusController = void 0;
const common_1 = require("@nestjs/common");
const ous_service_1 = require("./ous.service");
const ous_entity_1 = require("./ous.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const config_enum_1 = require("../enum/config.enum");
let OusController = class OusController {
    constructor(ousService) {
        this.ousService = ousService;
    }
    findOuByUser(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Invalid authorization token');
        }
        const token = authHeader.split(' ')[1];
        return this.ousService.findOuByUser(token);
    }
    findOus() {
        return this.ousService.findOus();
    }
    findOu(id) {
        return this.ousService.findOu(id);
    }
    async createOu(ou) {
        return await this.ousService.createOu(ou);
    }
    updateOu(id, role) {
        return this.ousService.updateOu(id, role);
    }
    deleteOu(id) {
        return this.ousService.deleteOu(id);
    }
};
exports.OusController = OusController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)('findou'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OusController.prototype, "findOuByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OusController.prototype, "findOus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OusController.prototype, "findOu", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ous_entity_1.Ou]),
    __metadata("design:returntype", Promise)
], OusController.prototype, "createOu", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ous_entity_1.Ou]),
    __metadata("design:returntype", Promise)
], OusController.prototype, "updateOu", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)(config_enum_1.UserRole.ADMIN, config_enum_1.UserRole.SUPERADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OusController.prototype, "deleteOu", null);
exports.OusController = OusController = __decorate([
    (0, common_1.Controller)('ous'),
    __metadata("design:paramtypes", [ous_service_1.OusService])
], OusController);
//# sourceMappingURL=ous.controller.js.map