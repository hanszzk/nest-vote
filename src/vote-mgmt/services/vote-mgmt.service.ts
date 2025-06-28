import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VoteTopicDto } from '../dto/vote-topic.dto';
import { commonConstants } from 'src/common/constants/common.constants';
import { Cache } from 'cache-manager';
import { Result } from 'src/common/interfaces/result.interface';
import { VoteCandidateDto } from '../dto/vote-candidate.dto';
import { VoteTopicStatusDto } from '../dto/vote-topic-status.dto';

@Injectable()
export class VoteMgmtService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createVoteTopic(createVoteDto: VoteTopicDto) {
        const { VOTE_TOPIC_CACHE_KEY, NOT_STASTUS } = commonConstants;
        const voteTopicList = await this.findVoteTopicList();
        voteTopicList.push({
            ...createVoteDto,
            status: NOT_STASTUS,
            id: createVoteDto.id ?? Date.now().toString(),
        });
        await this.cacheManager.set(VOTE_TOPIC_CACHE_KEY, voteTopicList);

        return Result.suc(createVoteDto);
    }

    async addVoteCandidate(voteCandidateDtoList: VoteCandidateDto[]) {
        const { VOTE_TOPIC_CACHE_KEY, FINISHED } = commonConstants;
        const voteTopic = await this.findVoteTopicById(voteCandidateDtoList[0].voteTopicId);
        if (!voteTopic || voteTopic.status === FINISHED) {
            return Result.fail('Vote topic not found or already finished');
        }

        voteTopic.candidateList = voteCandidateDtoList;
        await this.cacheManager.set<VoteTopicDto>(VOTE_TOPIC_CACHE_KEY, voteTopic);
        return Result.suc();
    }

    async updateVoteTopicStatus(voteTopicStatusDto: VoteTopicStatusDto) {
        const { FINISHED } = commonConstants;
        const voteTopic = await this.findVoteTopicById(voteTopicStatusDto.voteTopicId);
        if (!voteTopic) {
            return Result.fail('Vote topic not found');
        }

        voteTopic.status = voteTopicStatusDto.status;
        if (voteTopic.status === FINISHED) {
            // 统计每个候选人的投票数量
            const candidateVoteCount = voteTopic.candidateList?.reduce(
                (acc, candidate) => {
                    acc[candidate.id] = candidate.voteUserList ? candidate.voteUserList.length : 0;
                    return acc;
                },
                {} as Record<string, number>,
            );
            voteTopic.candidateList?.forEach((candidate) => {
                candidate.totalVotes = candidateVoteCount?.[candidate.id] || 0;
            });
        }

        await this.updateVoteTopicById(voteTopic);

        return Result.suc();
    }

    async readVoteTopicCount(voteTopicId: string) {
        const voteTopic = await this.findVoteTopicById(voteTopicId);
        if (!voteTopic || voteTopic.status !== commonConstants.FINISHED) {
            return Result.fail('Vote topic not found or not finished');
        }

        // 除去 voteTopic.candidateList 中不需要的字段后返回
        voteTopic.candidateList?.map((candidate) => ({
            ...candidate,
            voteUserList: undefined, // 不返回投票用户列表
        }));

        return Result.suc(voteTopic);
    }

    async findVoteTopicList() {
        const { VOTE_TOPIC_CACHE_KEY } = commonConstants;
        return this.cacheManager.get<VoteTopicDto[]>(VOTE_TOPIC_CACHE_KEY).then((res) => res ?? []);
    }

    async findVoteTopicById(voteTopicId: string) {
        const voteTopicList = await this.findVoteTopicList();
        return voteTopicList.find((topic) => topic.id === voteTopicId);
    }

    async updateVoteTopicById(voteTopic: VoteTopicDto) {
        const { VOTE_TOPIC_CACHE_KEY } = commonConstants;
        const voteTopicList = await this.findVoteTopicList();
        const index = voteTopicList.findIndex((topic) => topic.id === voteTopic.id);
        if (index !== -1) {
            voteTopicList[index] = voteTopic;
            await this.cacheManager.set(VOTE_TOPIC_CACHE_KEY, voteTopicList);
        }
    }
}
