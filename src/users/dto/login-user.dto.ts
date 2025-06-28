import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ description: '用户名', maxLength: 50, example: 'hans' })
    declare name: string;

    @IsNotEmpty()
    @ApiProperty({ description: '密码', example: 'password123' })
    password: string;
}
