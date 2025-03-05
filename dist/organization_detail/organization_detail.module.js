"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDetailModule = void 0;
const common_1 = require("@nestjs/common");
const organization_detail_service_1 = require("./organization_detail.service");
const organization_detail_controller_1 = require("./organization_detail.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const organization_detail_entity_1 = require("./organization_detail.entity");
let OrganizationDetailModule = class OrganizationDetailModule {
};
exports.OrganizationDetailModule = OrganizationDetailModule;
exports.OrganizationDetailModule = OrganizationDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([organization_detail_entity_1.OrganizationDetail]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN', '1h'),
                    },
                }),
            }),
        ],
        controllers: [organization_detail_controller_1.OrganizationDetailController],
        providers: [organization_detail_service_1.OrganizationDetailService],
        exports: [organization_detail_service_1.OrganizationDetailService],
    })
], OrganizationDetailModule);
//# sourceMappingURL=organization_detail.module.js.map