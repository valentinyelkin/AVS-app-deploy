import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get<T>(name: string): T;
}
