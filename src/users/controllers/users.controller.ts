import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Request as ExpressRequest } from 'express';
import { UserDto } from '../dto/user.dto';

@ApiTags('用户 API')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post('register')
    @ApiOperation({ summary: '用户注册接口' })
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registerUser(createUserDto);
    }

    @Get('info')
    @Auth(Role.Admin)
    @ApiOperation({ summary: '管理员查询用户信息' })
    async findUser(@Query() queryUserDto: QueryUserDto) {
        return this.usersService.findOne(queryUserDto.ssn ?? '');
    }

    @Get('detail')
    @Auth(Role.User)
    @ApiOperation({ summary: '用户查询自己详细信息' })
    async findUserDetail(@Request() req: ExpressRequest & { user: UserDto }) {
        return this.usersService.findOne(req.user?.ssn);
    }

    @Get('test')
    @ApiOperation({ summary: '测试用户认证接口' })
    findUserInfo() {
        // This is just a test endpoint to check if the user is authenticated
        return null;
    }
}
