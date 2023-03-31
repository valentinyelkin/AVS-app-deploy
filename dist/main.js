"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("multer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./modules/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: ['http://localhost:3333'],
        },
    });
    const configService = app.get(config_1.ConfigService);
    const environment = configService.get('NODE_ENV');
    app.useLogger(environment === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn']);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Banda Deploy')
        .setDescription('Base api with user entities and file upload ')
        .setVersion('1.0.0')
        .addTag('')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api', app, document);
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
//# sourceMappingURL=main.js.map