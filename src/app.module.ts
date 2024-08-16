import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as RedisStore from 'cache-manager-ioredis';
import Redis from 'ioredis'

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        const redisClient = new Redis({
          host: process.env.REDIS_HOST || 'redis',
          port: Number(process.env.REDIS_PORT) || 6379,
        });

        return {
          store: RedisStore,
          redisInstance: redisClient,
          ttl: 60, // Время жизни кэша в секундах
        };
      },
    }),
    ConfigModule.forRoot(),
    ArticleModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
