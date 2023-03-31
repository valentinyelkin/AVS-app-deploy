/// <reference types="multer" />
import { Response } from 'express';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
export declare class FilesController {
    private s3Service;
    private readonly logger;
    constructor(s3Service: S3ManagerService);
    uploadFile(file: Express.Multer.File): Promise<import("aws-sdk/clients/s3").ManagedUpload.SendData>;
    findOne(id: string, res: Response): Promise<Response>;
    update(file: Express.Multer.File, id: string): Promise<void>;
}
