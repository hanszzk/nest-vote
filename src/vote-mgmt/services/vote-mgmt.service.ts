import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateVoteTopicDto } from '../dto/create-vote-topic.dto';
import { commonConstants } from 'src/common/constants/common.constants';
import { Cache } from 'cache-manager';
import { Result } from 'src/common/interfaces/result.interface';
import { VoteCandidateDto } from '../dto/vote-candidate.dto';
import { VoteTopicStatusDto } from '../dto/vote-topic-status.dto';

@Injectable()
export class VoteMgmtService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createVoteTopic(createVoteDto: CreateVoteTopicDto) {
        const { NOT_STASTUS, VOTE_TOPIC_CACHE_PREFIX } = commonConstants;

        createVoteDto.id = VOTE_TOPIC_CACHE_PREFIX + Date.now().toString();
        createVoteDto.status = NOT_STASTUS;
        await this.cacheManager.set<CreateVoteTopicDto>(createVoteDto.id, createVoteDto);

        return Result.suc(createVoteDto);
    }

    async addVoteCandidate(voteCandidateDtoList: VoteCandidateDto[]) {
        const voteTopicId = voteCandidateDtoList[0].voteTopicId;
        const voteTopic = await this.cacheManager.get<CreateVoteTopicDto>(voteTopicId);
        if (!voteTopic || voteTopic.status === commonConstants.FINISHED) {
            return Result.fail('Vote topic not found or already finished');
        }

        voteTopic.candidateList = voteCandidateDtoList;
        await this.cacheManager.set<CreateVoteTopicDto>(voteTopicId, voteTopic);
        return Result.suc();
    }

    async updateVoteTopicStatus(voteTopicStatusDto: VoteTopicStatusDto) {
        const voteTopicId = voteTopicStatusDto.voteTopicId;
        const voteTopic = await this.cacheManager.get<CreateVoteTopicDto>(voteTopicId);
        if (!voteTopic) {
            return Result.fail('Vote topic not found');
        }

        voteTopic.status = voteTopicStatusDto.status;
        if (voteTopic.status === commonConstants.FINISHED) {
            // 统计每个候选人的投票数量
            const candidateVoteCount = voteTopic.candidateList.reduce(
                (acc, candidate) => {
                    acc[candidate.id] = candidate.voteUserList ? candidate.voteUserList.length : 0;
                    return acc;
                },
                {} as Record<string, number>,
            );
            voteTopic.candidateList.forEach((candidate) => {
                candidate.totalVotes = candidateVoteCount[candidate.id] || 0;
            });
        }
        await this.cacheManager.set<CreateVoteTopicDto>(voteTopicId, voteTopic);

        return Result.suc();
    }

    async readVoteTopicCount(voteTopicId: string) {
        const voteTopic = await this.cacheManager.get<CreateVoteTopicDto>(voteTopicId);
        if (!voteTopic || voteTopic.status !== commonConstants.FINISHED) {
            return Result.fail('Vote topic not found or not finished');
        }

        // 除去 voteTopic.candidateList 中不需要的字段后返回
        voteTopic.candidateList.map((candidate) => ({
            ...candidate,
            voteUserList: undefined, // 不返回投票用户列表
        }));

        return Result.suc(voteTopic);
    }
}
