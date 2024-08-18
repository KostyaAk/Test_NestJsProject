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
    date_public?: string; // например "2024-05-13"
}
