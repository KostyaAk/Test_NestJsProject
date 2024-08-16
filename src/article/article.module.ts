import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as RedisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CacheModule.register({
      store: RedisStore, // Указываем store
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT) || 6379,
      ttl: 60, // Время жизни кэша в секундах
    }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService]
})

export class ArticleModule { }
