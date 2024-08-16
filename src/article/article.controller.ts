import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { PaginationDto } from './dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    //get all articles
    @Get()
    async findAll(@Query() pagination: PaginationDto, @Query() filterQuery: FilterDto,): Promise<{ data: Article[], total: number }> {
        try {
            return this.articleService.findAll(pagination, filterQuery);
        } catch (error) {
            throw new error(`Error fetching articles: ${error.message}`);
        }
    }

    //get article by id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Article> {
        const article = await this.articleService.findOne(id);
        if (!article) {
            throw new NotFoundException('Article does not exist');
        }
        else {
            return article;
        }
    }

    //create article
    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() article: Article): Promise<Article> {
        return this.articleService.create(article);
    }

    //update one article
    @UseGuards(AccessTokenGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() article: Article): Promise<any> {
        return this.articleService.update(id, article);
    }

    //delete article
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        const article = await this.articleService.findOne(id);

        if (!article) {
            throw new NotFoundException('Article does not exist')
        }
        return this.articleService.delete(id);
    }
}
