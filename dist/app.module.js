"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const users_entity_1 = require("./users/users.entity");
const roles_module_1 = require("./roles/roles.module");
const roles_entity_1 = require("./roles/roles.entity");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const roles_guard_1 = require("./auth/roles.guard");
const axios_1 = require("@nestjs/axios");
const menus_module_1 = require("./menus/menus.module");
const menus_entity_1 = require("./menus/menus.entity");
const role_details_module_1 = require("./role_details/role_details.module");
const role_details_entity_1 = require("./role_details/role_details.entity");
const helpdesk_gateway_1 = require("./helpdesk/helpdesk.gateway");
const helpdesk_service_1 = require("./helpdesk/helpdesk.service");
const otp_module_1 = require("./otp/otp.module");
const otp_service_1 = require("./otp/otp.service");
const organization_module_1 = require("./organization/organization.module");
const department_module_1 = require("./department/department.module");
const organization_detail_module_1 = require("./organization_detail/organization_detail.module");
const organization_entity_1 = require("./organization/organization.entity");
const organization_detail_entity_1 = require("./organization_detail/organization_detail.entity");
const department_entity_1 = require("./department/department.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [
                        users_entity_1.User,
                        roles_entity_1.Role,
                        menus_entity_1.Menu,
                        role_details_entity_1.RoleDetail,
                        organization_entity_1.Organization,
                        organization_detail_entity_1.OrganizationDetail,
                        department_entity_1.Department,
                    ],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            axios_1.HttpModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            menus_module_1.MenusModule,
            role_details_module_1.RoleDetailsModule,
            otp_module_1.OtpModule,
            organization_module_1.OrganizationModule,
            department_module_1.DepartmentModule,
            organization_detail_module_1.OrganizationDetailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            helpdesk_gateway_1.HelpdeskGateway,
            helpdesk_service_1.HelpdeskService,
            otp_service_1.OtpService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map