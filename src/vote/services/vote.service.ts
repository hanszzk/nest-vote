import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { VoteDto } from '../dto/vote.dto';
import { Result } from 'src/common/interfaces/result.interface';

@Injectable()
export class VoteService {
    readVoterInfo(user: UserDto) {
        return Result.suc(user);
    }

    handleVote(voteDto: VoteDto, userDto: UserDto) {
        return Result.suc({ voteDto, userDto });
    }
}
