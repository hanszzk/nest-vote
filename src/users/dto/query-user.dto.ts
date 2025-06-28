import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class QueryUserDto {
    @IsOptional()
    @MaxLength(50)
    @ApiPropertyOptional({ description: '用户名', maxLength: 50, example: 'hans' })
    name?: string;

    @IsOptional()
    @MaxLength(20)
    @ApiPropertyOptional({ description: 'SSN', maxLength: 20, example: '123456789' })
    ssn?: string;
}
