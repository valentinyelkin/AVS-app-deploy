import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    findOneBy(where: any): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
    } & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
}
