import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { Article } from './article.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaginationDto } from './dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async findAll(pagination: PaginationDto, filter: FilterDto): Promise<{ data: Article[], total: number }> {
        const { page = 1, limit = 30 } = pagination;
        const offset = (page - 1) * limit;

        // Генерация уникального ключа кэша на основе параметров пагинации
        const cacheKey = `articles_list_page_${page}_limit_${limit}_filters_${JSON.stringify(filter)}`;

        // Попытка получить данные из кэша
        let cachedData = await this.cacheManager.get<{ data: Article[], total: number }>(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const whereConditions: FindManyOptions<Article> = {
            skip: offset,
            take: limit,
            where: {},
        };

        if (filter.name) {
            whereConditions.where['name'] = Like(`%${filter.name}%`);
        }

        if (filter.author) {
            whereConditions.where['author'] = Like(`%${filter.author}%`);
        }

        if (filter.date_public) {
            whereConditions.where['date_public'] = new Date(filter.date_public);
        }

        // Если данные не найдены в кэше, запрашиваем их из базы данных
        const [data, total] = await this.articleRepository.findAndCount(whereConditions)

        // Сохраняем данные в кэше с временем жизни в 60 секунд
        await this.cacheManager.set(cacheKey, { data, total }, 60);

        return { data, total };
    }

    async findOne(id: number): Promise<Article> {
        //return this.articleRepository.findOne({ where: { id } });
        const cachedArticle = await this.cacheManager.get<Article>(`article_${id}`);
        if (cachedArticle) {
            return cachedArticle;
        }

        const article = await this.articleRepository.findOne({ where: { id } });
        if (article) {
            await this.cacheManager.set(`article_${id}`, article, 60);
        }

        return article;
    }

    async create(article: Partial<Article>): Promise<Article> {
        // const newarticle = this.articleRepository.create(article);
        // return this.articleRepository.save(newarticle);
        const newArticle = this.articleRepository.create(article);
        await this.articleRepository.save(newArticle);

        // Получаем обновленный список всех статей
        const updatedArticlesList = await this.articleRepository.find();

        // Обновляем кэш для списка статей
        await this.cacheManager.set('articles_list', updatedArticlesList, 60);

        return newArticle;
    }

    async update(id: number, article: Partial<Article>): Promise<Article> {
        await this.articleRepository.update(id, article);
        const updatedArticle = await this.articleRepository.findOne({ where: { id } });
        await this.cacheManager.set(`article_${id}`, updatedArticle, 60);

        return updatedArticle
    }

    async delete(id: number): Promise<void> {
        await this.articleRepository.delete(id);
        await this.cacheManager.del(`article_${id}`);
    }
}
