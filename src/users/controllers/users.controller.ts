import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { QueryUserDto } from '../dto/query-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }


    @Public()
    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registerUser(createUserDto);
    }

    @Get('info')
    @Auth(Role.Admin)
    async findUser(@Query() queryUserDto: QueryUserDto) {
        return this.usersService.findOne(queryUserDto.ssn);
    }

    @Get('detail')
    @Auth(Role.User)
    async findUserDetail(@Request() req: any) {
        return this.usersService.findOne(req?.user?.ssn);
    }

    @Get('test')
    async findUserInfo() {
        // This is just a test endpoint to check if the user is authenticated
        return null
    }
}
