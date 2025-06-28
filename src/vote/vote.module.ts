import { Module } from '@nestjs/common';
import { VoteController } from './controllers/vote.controller';
import { VoteService } from './services/vote.service';
import { VoteMgmtService } from 'src/vote-mgmt/services/vote-mgmt.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
    controllers: [VoteController],
    providers: [VoteService, VoteMgmtService, UsersService],
})
export class VoteModule {}
