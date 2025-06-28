import { IsArray, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { VoteCandidateDto } from './vote-candidate.dto';

export class VoteTopicDto {
    id: string;

    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    status: string;

    @IsOptional()
    @IsArray()
    candidateList?: VoteCandidateDto[]; //候选人列表
}
