import { IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VoteCandidateDto } from './vote-candidate.dto';

export class VoteTopicDto {
    @ApiProperty({
        description: '投票主题ID',
        example: '1751096939952',
    })
    id: string;

    @ApiProperty({
        description: '投票主题标题',
        maxLength: 50,
        example: '第50届美国总统选举',
    })
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @ApiPropertyOptional({
        description: '投票主题状态:0:未开始，1：进行中，2：已结束',
        example: ['0', '1', '2'],
    })
    status: string;

    @IsOptional()
    @IsArray()
    @ApiPropertyOptional({
        description: '候选人列表',
        type: [VoteCandidateDto],
        example: [
            { voteTopicId: '1751096939952', ssn: '123456789', name: 'zzk' },
            { voteTopicId: '1751096939952', ssn: '123456782', name: 'hans' },
        ],
    })
    candidateList?: VoteCandidateDto[]; //候选人列表
}
