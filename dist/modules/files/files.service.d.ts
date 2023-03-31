export declare class FilesService {
    findOneById(id: any): Promise<void>;
    uploadFile(fileName: string): Promise<void>;
    findOne(fileName: number): Promise<void>;
    update(fileName: string): Promise<void>;
}
