import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteMgmtModule } from './vote-mgmt/vote-mgmt.module';
import { SquareModule } from './square/square.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/services/auth.service';
import { AuthController } from './auth/controllers/auth.controller';
import { VoteModule } from './vote/vote.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        VoteMgmtModule,
        VoteModule,
        SquareModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {}
