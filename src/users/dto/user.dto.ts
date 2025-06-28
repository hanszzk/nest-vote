import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ description: '用户名', maxLength: 50, example: 'hans' })
    name: string;

    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ description: 'SSN', maxLength: 20, example: '123456789' })
    ssn: string;

    @ApiProperty({ description: '用户角色列表', type: [String], example: ['user', 'admin'] })
    roles: string[] = []; // 用户角色列表
}
