"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize1680090771723 = void 0;
class Initialize1680090771723 {
    constructor() {
        this.name = 'Initialize1680090771723';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
exports.Initialize1680090771723 = Initialize1680090771723;
//# sourceMappingURL=1680090771723-Initialize.js.map