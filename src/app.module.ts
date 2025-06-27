import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoterModule } from './voter/voter.module';
import { VoteMgmtModule } from './vote-mgmt/vote-mgmt.module';
import { SquareModule } from './square/square.module';

@Module({
  imports: [VoterModule, VoteMgmtModule, SquareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
