import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initialize1680090771723 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
