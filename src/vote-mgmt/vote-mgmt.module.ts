import { Module } from '@nestjs/common';
import { VoteMgmtController } from './controllers/vote-mgmt.controller';
import { VoteMgmtService } from './services/vote-mgmt.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
    controllers: [VoteMgmtController],
    providers: [VoteMgmtService, UsersService],
    exports: [VoteMgmtService],
})
export class VoteMgmtModule {}
