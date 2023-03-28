import { join } from 'path';

import { DataSource } from 'typeorm';

export default new DataSource({
  driver: undefined,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123123123',
  database: 'banda-deploy',
  entities: ['./src/**/*.entity.ts'],
  migrations: [join(__dirname, '../seeds/*.{t,j}s')],
  migrationsRun: true,
  synchronize: false,
});
