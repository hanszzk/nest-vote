import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { VoteMgmtService } from '../services/vote-mgmt.service';
import { VoteTopicDto } from '../dto/vote-topic.dto';
import { VoteTopicStatusDto } from '../dto/vote-topic-status.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { VoteTopicCandidateDto } from '../dto/vote-topic-candidate.dto';

@ApiTags('投票管理 API')
@Controller('vote-mgmt')
@ApiBearerAuth()
@Auth(Role.Admin)
export class VoteMgmtController {
    constructor(private readonly voteMgmtService: VoteMgmtService) {}

    @Post('vote-topic')
    @ApiOperation({ summary: '创建投票主题' })
    async createVoteTopic(@Body() body: VoteTopicDto) {
        return this.voteMgmtService.createVoteTopic(body);
    }

    @Post('vote-topic-candidate')
    @ApiOperation({ summary: '添加投票候选人' })
    async addVoteCandidate(@Body() body: VoteTopicCandidateDto) {
        return this.voteMgmtService.addVoteCandidate(body.VoteCandidateList);
    }

    @Put('vote-topic-status')
    @ApiOperation({ summary: '更新投票主题状态' })
    async updateVoteTopicStatus(@Body() body: VoteTopicStatusDto) {
        return this.voteMgmtService.updateVoteTopicStatus(body);
    }

    @Get('vote-topic/:voteTopicId')
    @ApiOperation({ summary: '查询选举结果' })
    @ApiParam({ name: 'voteTopicId', description: '投票主题ID', example: '1751096939952' })
    async readVoteTopic(@Param('voteTopicId') voteTopicId: string) {
        return this.voteMgmtService.readVoteTopicCount(voteTopicId);
    }
}
