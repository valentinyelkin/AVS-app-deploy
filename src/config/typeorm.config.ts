import { join } from 'path';

import { DataSource } from 'typeorm';

import { User } from '../entity/user.entity';

export default new DataSource({
  driver: undefined,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123123123',
  database: 'banda-deploy',
  entities: [User],
  migrations: [join(__dirname, '../migrations/*.ts')],
  migrationsRun: true,
  synchronize: false,
});
