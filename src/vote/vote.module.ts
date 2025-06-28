import { Module } from '@nestjs/common';
import { VoteController } from './controllers/vote.controller';
import { VoteService } from './services/vote.service';
import { CacheModule } from '@nestjs/cache-manager';
import { VoteMgmtService } from 'src/vote-mgmt/services/vote-mgmt.service';

@Module({
    imports: [CacheModule.register()],
    controllers: [VoteController],
    providers: [VoteService, VoteMgmtService],
})
export class VoteModule {}
