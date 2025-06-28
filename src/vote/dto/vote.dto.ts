import { IsArray, IsNotEmpty } from 'class-validator';
import { VoteCandidateDto } from 'src/vote-mgmt/dto/vote-candidate.dto';

export class VoteDto {
  @IsNotEmpty()
  voteTopicId: string;

  @IsNotEmpty()
  @IsArray()
  candidateList: VoteCandidateDto[]; // 候选人列表
}
