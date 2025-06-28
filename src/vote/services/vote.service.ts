import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { VoteDto } from '../dto/vote.dto';
import { Result } from 'src/common/interfaces/result.interface';

@Injectable()
export class VoteService {
  async readVoterInfo(user: UserDto) {}

  async handleVote(voteDto: VoteDto, userDto: UserDto) {
    return Result.suc();
  }
}
