import { IsNotEmpty, MaxLength } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class VoteCandidateDto {
    id: string;

    @IsNotEmpty()
    voteTopicId: string;

    @IsNotEmpty()
    @MaxLength(50)
    ssn: string;

    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    totalVotes: number; // 总得票数

    voteUserList?: UserDto[]; // 记录投票的用户列表
}
