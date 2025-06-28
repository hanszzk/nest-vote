import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @MaxLength(20)
    ssn: string;

    roles: string[] = []; // 用户角色列表
}
