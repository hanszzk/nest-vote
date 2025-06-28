import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { VoteCandidateDto } from 'src/vote-mgmt/dto/vote-candidate.dto';

export class VoteDto {
    @IsNotEmpty()
    @ApiProperty({ description: '投票主题ID', example: '1751096939952' })
    voteTopicId: string;

    @IsNotEmpty()
    @ApiProperty({
        description: '候选人信息',
        type: VoteCandidateDto,
        example: { voteTopicId: '1751096939952', ssn: '123456789', name: 'zzk2' },
    })
    candidate: VoteCandidateDto;
}
