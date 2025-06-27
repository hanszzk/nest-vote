import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './constants/autn.constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        CacheModule.register(),
        JwtModule.register({
            global: true,
            secret: authConstants.secret,
            signOptions: { expiresIn: authConstants.expiresIn },
        }),
    ],
    providers: [
        AuthService,
        UsersService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }