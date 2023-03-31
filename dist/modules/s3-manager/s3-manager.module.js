"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("../../config/app/app.config.service");
const aws_config_1 = require("../../config/aws.config");
const s3_manager_service_1 = require("./s3-manager.service");
let S3ManagerModule = class S3ManagerModule {
};
S3ManagerModule = __decorate([
    (0, common_1.Module)({
        providers: [s3_manager_service_1.S3ManagerService, app_config_service_1.AppConfigService, aws_config_1.AwsConfig],
        exports: [s3_manager_service_1.S3ManagerService],
    })
], S3ManagerModule);
exports.S3ManagerModule = S3ManagerModule;
//# sourceMappingURL=s3-manager.module.js.map