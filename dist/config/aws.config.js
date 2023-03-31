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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsConfig = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("./app/app.config.service");
let AwsConfig = class AwsConfig {
    constructor(configService) {
        this.configService = configService;
        this.s3Region = this.configService.get('AWS_S3_REGION');
        this.s3Bucket = this.configService.get('AWS_S3_BUCKET');
        if (process.env.NODE_ENV === 'development') {
            this.accessKey = this.configService.get('AWS_ACCESS_KEY');
            this.secretKey = this.configService.get('AWS_SECRET_KEY');
            this.localEndpoint = this.configService.get('AWS_LOCAL_ENDPOINT');
        }
    }
};
AwsConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_config_service_1.AppConfigService])
], AwsConfig);
exports.AwsConfig = AwsConfig;
//# sourceMappingURL=aws.config.js.map