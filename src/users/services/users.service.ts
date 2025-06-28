import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserDto } from '../dto/create-user.dto';
import { Result } from 'src/common/interfaces/result.interface';

@Injectable()
export class UsersService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async registerUser(createUserDto: CreateUserDto) {
        const id = 'user:' + createUserDto.ssn;
        const user = await this.cacheManager.get<CreateUserDto>(id);
        if (user) {
            return Result.fail('user already exists');
        }

        await this.cacheManager.set(id, createUserDto);

        return Result.suc();
    }

    async findOne(ssn: string) {
        return this.cacheManager.get<CreateUserDto>('user:' + ssn);
    }
}
