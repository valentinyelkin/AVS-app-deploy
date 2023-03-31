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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const aws_sdk_1 = require("aws-sdk");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const typeorm_2 = require("typeorm");
const app_config_module_1 = require("../../config/app/app.config.module");
const aws_config_1 = require("../../config/aws.config");
const logger_middleware_1 = require("../../middleware/logger/logger.middleware");
const files_module_1 = require("../files/files.module");
const user_module_1 = require("../user/user.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.default).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: parseInt(configService.get('DB_PORT')),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        autoLoadEntities: true,
                        synchronize: false,
                    };
                },
            }),
            nest_aws_sdk_1.AwsSdkModule.forRootAsync({
                defaultServiceOptions: {
                    imports: [app_config_module_1.AppConfigModule],
                    inject: [aws_config_1.AwsConfig],
                    useFactory: (awsConfig) => {
                        return Object.assign({ region: awsConfig.s3Region }, (awsConfig.localEndpoint
                            ? {
                                endpoint: awsConfig.localEndpoint,
                                s3ForcePathStyle: true,
                                signatureVersion: 'v4',
                                accessKeyId: awsConfig.accessKey,
                                secretAccessKey: awsConfig.secretKey,
                            }
                            : {}));
                    },
                },
                services: [aws_sdk_1.S3],
            }),
            user_module_1.UserModule,
            files_module_1.FilesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map