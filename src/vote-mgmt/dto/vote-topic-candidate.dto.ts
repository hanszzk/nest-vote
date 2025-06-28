import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteCandidateDto } from './vote-candidate.dto';

export class VoteTopicCandidateDto {
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        description: '候选人列表',
        type: [VoteCandidateDto],
        example: [
            { voteTopicId: '1751096939952', ssn: '123456789', name: 'zzk' },
            { voteTopicId: '1751096939952', ssn: '1234567892', name: 'hans' },
        ],
    })
    VoteCandidateList: VoteCandidateDto[]; // 记录投票的用户列表
}
