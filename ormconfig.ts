import { DataSource } from 'typeorm';
import { Article } from './src/article/article.entity'; // Импортируйте свои сущности

export default new DataSource({
    type: process.env.DB_TYPE as any,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: [Article],
    migrations: ['src/migrations/**/*.ts'], // Путь к миграциям
    synchronize: false, // Не синхронизировать автоматически
});
