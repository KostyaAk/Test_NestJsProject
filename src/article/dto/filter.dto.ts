import { IsOptional, IsString, IsDateString } from 'class-validator';

export class FilterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsDateString()
    date_public?: string; // Используем строку в формате ISO для даты
}
