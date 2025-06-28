import { Module } from '@nestjs/common';
import { SquareController } from './controllers/square.controller';
import { SquareService } from './services/square.service';
import { VoteService } from 'src/vote/services/vote.service';
import { VoteMgmtService } from 'src/vote-mgmt/services/vote-mgmt.service';

@Module({
    controllers: [SquareController],
    providers: [SquareService, VoteService, VoteMgmtService],
})
export class SquareModule {}
