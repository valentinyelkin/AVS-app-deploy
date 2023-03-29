import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123123123',
  database: 'banda-deploy',
  entities: ['dist/**/*.entity.js'],
  migrations: [join(__dirname, '../../dist/migrations/*.js')],
  synchronize: false,
});
