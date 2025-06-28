import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VoteMgmtService } from '../services/vote-mgmt.service';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateVoteTopicDto } from '../dto/create-vote-topic.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { VoteCandidateDto } from '../dto/vote-candidate.dto';
import { VoteTopicStatusDto } from '../dto/vote-topic-status.dto';

@Controller('vote-mgmt')
// @Auth(Role.Admin)
@Public()
export class VoteMgmtController {

    constructor(
        private readonly voteMgmtService: VoteMgmtService
    ) { }


    @Post('vote-topic')
    async createVoteTopic(@Body() body: CreateVoteTopicDto) {
        return this.voteMgmtService.createVoteTopic(body);
    }

    @Post('vote-topic-candidate')
    async addVoteCandidate(@Body() body: VoteCandidateDto[]) {
        return this.voteMgmtService.addVoteCandidate(body);
    }

    @Put('vote-topic-status')
    async updateVoteTopicStatus(@Body() body: VoteTopicStatusDto) {
        return this.voteMgmtService.updateVoteTopicStatus(body);
    }

    @Get('vote-topic/:voteTopicId')
    async readVoteTopic(@Param('voteTopicId') voteTopicId: string) {
        return this.voteMgmtService.readVoteTopicCount(voteTopicId);
    }

}
