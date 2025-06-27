import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { QueryUserDto } from '../dto/query-user.dto';

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
    async findUser(@Query() queryUserDto: QueryUserDto) {
        return this.usersService.findOne(queryUserDto.ssn);
    }


}
