"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123123123',
    database: 'banda-deploy',
    entities: ['dist/**/*.entity.js'],
    migrations: [(0, path_1.join)(__dirname, '../../dist/migrations/*.js')],
    synchronize: false,
});
//# sourceMappingURL=typeorm.config.js.map