import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { VoteService } from '../services/vote.service';
import { VoteDto } from '../dto/vote.dto';

@Controller('vote')
// @Auth(Role.Admin)
@Public()
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async readVoterInfo(@Request() req) {
    return this.voteService.readVoterInfo(req.user);
  }

  @Post()
  async voteHandler(@Body() body: VoteDto, @Request() req) {
    return this.voteService.handleVote(body, req.user);
  }
}
