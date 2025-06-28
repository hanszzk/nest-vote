import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { VoteService } from '../services/vote.service';
import { VoteDto } from '../dto/vote.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Request as ExpressRequest } from 'express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('vote')
@Auth(Role.User)
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
