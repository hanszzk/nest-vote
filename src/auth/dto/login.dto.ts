import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ description: '用户名', maxLength: 50, example: 'hans' })
    name: string;

    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ description: 'SSN', maxLength: 20, example: '123456789' })
    ssn: string;
}
