"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
function ApiFile() {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: { fileSize: 1024 * 1024 * +process.env.FILE_LIMIT },
        fileFilter(_req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
                return cb(new common_1.BadRequestException('only image and pdf files are allowed'), false);
            }
            return cb(null, true);
        },
    })), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }));
}
exports.ApiFile = ApiFile;
//# sourceMappingURL=api-file.decorator.js.map