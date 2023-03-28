import { DataSource } from 'typeorm';

import { User } from '../entity/user.entity';
import { Initialize1680012106409 } from '../migrations/1680012106409-Initialize';

export default new DataSource({
  driver: undefined,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123123123',
  database: 'banda-deploy',
  entities: [User],
  migrations: [Initialize1680012106409],
  migrationsRun: true,
  synchronize: false,
});
