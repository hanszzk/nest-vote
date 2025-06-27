import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VoteMgmtService } from '../services/vote-mgmt.service';

@Controller('vote-mgmt')
export class VoteMgmtController {

    constructor(
        private readonly voterService: VoteMgmtService
    ) { }


}
