import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VoteService } from '../services/vote.service';
import { VoteDto } from '../dto/vote.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Request as ExpressRequest } from 'express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('投票 API')
@Controller('vote')
@ApiBearerAuth()
@Auth(Role.User)
export class VoteController {
    constructor(private readonly voteService: VoteService) {}

    @Get()
    @ApiOperation({ summary: '获取当前用户投票信息' })
    public readVoterInfo(@Request() req: ExpressRequest & { user: UserDto }) {
        return this.voteService.readVoterInfo(req.user);
    }

    @Post()
    @ApiOperation({ summary: '提交投票' })
    public voteHandler(@Body() body: VoteDto, @Request() req: ExpressRequest & { user: UserDto }) {
        return this.voteService.handleVote(body, req.user);
    }
}
