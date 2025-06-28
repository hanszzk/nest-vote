import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VoteTopicDto } from '../dto/vote-topic.dto';
import { commonConstants } from 'src/common/constants/common.constants';
import { Cache } from 'cache-manager';
import { Result } from 'src/common/interfaces/result.interface';
import { VoteCandidateDto } from '../dto/vote-candidate.dto';
import { VoteTopicStatusDto } from '../dto/vote-topic-status.dto';
import { VoteDto } from 'src/vote/dto/vote.dto';

@Injectable()
export class VoteMgmtService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createVoteTopic(createVoteDto: VoteTopicDto) {
        const { VOTE_TOPIC_CACHE_KEY, NOT_STASTUS } = commonConstants;
        const voteTopicList = await this.findVoteTopicList();
        const createdVoteTopic = {
            ...createVoteDto,
            status: NOT_STASTUS,
            id: createVoteDto.id ?? Date.now().toString(),
        };
        // 检查是否已存在id相同投票主题
        const existingVoteTopic = voteTopicList.find((topic) => topic.id === createdVoteTopic.id);
        if (existingVoteTopic) {
            return Result.fail('Vote topic with this ID already exists');
        }

        await this.cacheManager.set(VOTE_TOPIC_CACHE_KEY, [...voteTopicList, createdVoteTopic]);

        return Result.suc(createdVoteTopic);
    }

    async addVoteCandidate(voteCandidateDtoList: VoteCandidateDto[]) {
        const { FINISHED } = commonConstants;
        const voteTopic = await this.findVoteTopicById(voteCandidateDtoList[0].voteTopicId);
        if (!voteTopic || voteTopic.status === FINISHED) {
            return Result.fail('Vote topic not found or already finished');
        }

        voteTopic.candidateList = voteCandidateDtoList;
        await this.updateVoteTopicById(voteTopic);

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

        let candidate: VoteCandidateDto | null = null;
        let totalVotes = 0;
        // 统计topic中所有候选人得票数并查询得票最高的候选人
        await this.countVotes(voteTopic);
        voteTopic.candidateList?.map((item) => {
            if (item.totalVotes > totalVotes) {
                candidate = item;
                totalVotes = item.totalVotes;
            }
        });
        voteTopic.candidateList = undefined;

        return Result.suc({
            ...voteTopic,
            candidate,
        });
    }

    async countVotes(voteTopic: VoteTopicDto) {
        //查询当前topic的投票记录
        const voteHistoryList = await this.findVoteHistoryList(voteTopic.id);

        // 统计每个候选人的投票数量
        voteTopic.candidateList?.forEach((candidate) => {
            candidate.voteUserList = undefined;
            candidate.totalVotes = voteHistoryList.filter(
                (voteHistory) => voteHistory.candidate.ssn === candidate.ssn,
            ).length;
        });

        return voteTopic;
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

    async findVoteHistoryList(voteTopicId: string) {
        const voteHistoryKey = commonConstants.VOTE_HISTORY_CACHE_KEY + voteTopicId;
        return this.cacheManager.get<Array<{ ssn: string } & VoteDto>>(voteHistoryKey).then((res) => res ?? []);
    }
}
