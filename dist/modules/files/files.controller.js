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
var FilesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const openapi = require("@nestjs/swagger");
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mime_types_1 = require("mime-types");
const file_response_message_enum_1 = require("../../common/enums/file-response-message.enum");
const s3_manager_service_1 = require("../s3-manager/s3-manager.service");
const api_file_decorator_1 = require("./decorator/api-file.decorator");
const files_dto_1 = require("./dto/files.dto");
let FilesController = FilesController_1 = class FilesController {
    constructor(s3Service) {
        this.s3Service = s3Service;
        this.logger = new common_1.Logger(FilesController_1.name);
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_1.BadRequestException(file_response_message_enum_1.FileResponseMessageEnum.PROVIDE_FILE);
        }
        const { mimetype: mimeType } = await file;
        const fileName = `${(0, node_crypto_1.randomUUID)()}.${(0, mime_types_1.extension)(mimeType)}`;
        const newFile = await this.s3Service.upload(fileName, file.buffer);
        this.logger.debug(`Successfully created file: ${fileName}`);
        return newFile;
    }
    async findOne(id, res) {
        try {
            await this.s3Service.headObject(id);
            const file = this.s3Service.getObject(id);
            console.log(file, 'file');
            return file.pipe(res);
        }
        catch (e) {
            throw e.statusCode === 404
                ? new common_1.NotFoundException(file_response_message_enum_1.FileResponseMessageEnum.NOT_FOUND)
                : new common_1.InternalServerErrorException(e);
        }
    }
    async update(file, id) {
        await this.s3Service.deleteFile(id);
        if (!file) {
            throw new common_1.BadRequestException(file_response_message_enum_1.FileResponseMessageEnum.PROVIDE_FILE);
        }
        const { originalname: fileName } = await file;
        await this.s3Service.upload(fileName, file.buffer);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add new file' }),
    (0, swagger_1.ApiOkResponse)({ type: files_dto_1.FileResponseDto }),
    (0, common_1.HttpCode)(201),
    (0, api_file_decorator_1.ApiFile)(),
    (0, common_1.Post)('/upload'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({ type: Buffer }),
    (0, swagger_1.ApiBadRequestResponse)({ description: file_response_message_enum_1.FileResponseMessageEnum.BAD_REQUEST }),
    (0, swagger_1.ApiNotFoundResponse)({ description: file_response_message_enum_1.FileResponseMessageEnum.NOT_FOUND }),
    (0, swagger_1.ApiOperation)({ summary: 'Get file by id' }),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({ description: file_response_message_enum_1.FileResponseMessageEnum.BAD_REQUEST }),
    (0, swagger_1.ApiNotFoundResponse)({ description: file_response_message_enum_1.FileResponseMessageEnum.NOT_FOUND }),
    (0, swagger_1.ApiOperation)({ summary: 'Update file by id' }),
    (0, swagger_1.ApiOkResponse)({ type: files_dto_1.FileResponseDto }),
    (0, api_file_decorator_1.ApiFile)(),
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "update", null);
FilesController = FilesController_1 = __decorate([
    (0, swagger_1.ApiTags)('files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [s3_manager_service_1.S3ManagerService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map