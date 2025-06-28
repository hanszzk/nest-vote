import { Module } from '@nestjs/common';
import { VoteMgmtController } from './controllers/vote-mgmt.controller';
import { VoteMgmtService } from './services/vote-mgmt.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersService } from 'src/users/services/users.service';

@Module({
    imports: [CacheModule.register()],
    controllers: [VoteMgmtController],
    providers: [VoteMgmtService, UsersService],
    exports: [VoteMgmtService],
})
export class VoteMgmtModule {}
