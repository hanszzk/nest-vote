import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { VoteService } from '../services/vote.service';
import { VoteDto } from '../dto/vote.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Request as ExpressRequest } from 'express';

@Controller('vote')
// @Auth(Role.Admin)
@Public()
export class VoteController {
    constructor(private readonly voteService: VoteService) {}

    @Get()
    public readVoterInfo(@Request() req: ExpressRequest & { user: UserDto }) {
        return this.voteService.readVoterInfo(req.user);
    }

    @Post()
    public voteHandler(@Body() body: VoteDto, @Request() req: ExpressRequest & { user: UserDto }) {
        return this.voteService.handleVote(body, req.user);
    }
}
