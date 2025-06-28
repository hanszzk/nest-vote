import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersController } from './controllers/users.controller';

@Module({
    imports: [CacheModule.register()],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
