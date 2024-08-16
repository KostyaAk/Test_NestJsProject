import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    page?: number;

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;
}
