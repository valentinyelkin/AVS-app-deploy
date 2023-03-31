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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_response_message_enum_1 = require("../../common/enums/users-response-message.enum");
const user_entity_1 = require("../../entities/user.entity");
let UserService = UserService_1 = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findOneBy(where) {
        const user = await this.userRepository.findOne({
            where: Object.assign({}, where),
        });
        if (!user) {
            this.logger.error(users_response_message_enum_1.UsersResponseMessageEnum.NOT_FOUND);
            throw new common_1.NotFoundException(users_response_message_enum_1.UsersResponseMessageEnum.NOT_FOUND);
        }
        this.logger.log(`User by id: ${where.id}`);
        return user;
    }
    async create(createUserDto) {
        const user = await this.userRepository.findOneBy({ name: createUserDto.name });
        if (user) {
            this.logger.error(users_response_message_enum_1.UsersResponseMessageEnum.DUPLICATE);
            throw new common_1.NotFoundException(users_response_message_enum_1.UsersResponseMessageEnum.DUPLICATE);
        }
        return this.userRepository.save({
            name: createUserDto.name,
        });
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return await this.findOneBy({ id });
    }
    async update(id, updateUserDto) {
        await this.findOneBy({ id });
        await this.userRepository.update(id, {
            name: updateUserDto.name,
        });
        this.logger.log(`User updated`);
        return {
            message: `User updated`,
        };
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map