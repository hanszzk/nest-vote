import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserDto } from 'src/users/dto/user.dto';
import { VoteDto } from '../dto/vote.dto';
import { Result } from 'src/common/model/result.model';
import { commonConstants } from 'src/common/constants/common.constants';
import { VoteMgmtService } from 'src/vote-mgmt/services/vote-mgmt.service';

@Injectable()
export class VoteService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly voteMgmtService: VoteMgmtService,
    ) {}

    async readVoterInfo(userDto: UserDto) {
        const user = await this.cacheManager.get<UserDto>(commonConstants.USER_CACHE_KEY + userDto.ssn);
        const voteTopicList = await this.voteMgmtService.findVoteTopicList();
        const res = await Promise.all(
            voteTopicList.map(async (topic) => {
                const voteHistoryList = await this.voteMgmtService.findVoteHistoryList(topic.id);
                const hasHistory = voteHistoryList.some((voteHistory) => voteHistory.ssn === userDto.ssn);
                return {
                    name: user?.name,
                    ssn: user?.ssn,
                    voteTopicId: topic.id,
                    title: topic.title,
                    hasVoted: hasHistory ? '已投票' : '未投票',
                    status: topic.status,
                };
            }),
        );

        return Result.suc(res);
    }

    async handleVote(voteDto: VoteDto, userDto: UserDto) {
        // 获取投票主题缓存，如果投票主题不存在或已经结束，返回错误
        const voteTopic = await this.voteMgmtService.findVoteTopicById(voteDto.voteTopicId);
        if (!voteTopic || voteTopic.status === commonConstants.FINISHED) {
            return Result.fail('投票主题不存在或已结束');
        }

        //获取投票记录，如果用户已经投过票，返回错误
        const voteHistoryKey = commonConstants.VOTE_HISTORY_CACHE_KEY + voteDto.voteTopicId;
        const voteHistoryList = await this.voteMgmtService.findVoteHistoryList(voteDto.voteTopicId);
        const hasVoted = voteHistoryList.some((voteHistory) => voteHistory.ssn === userDto.ssn);
        if (hasVoted) {
            return Result.fail('您已经投过票了');
        }

        //保存投票记录
        voteHistoryList.push({ ssn: userDto.ssn, ...voteDto });
        await this.cacheManager.set(voteHistoryKey, voteHistoryList);

        return Result.suc();
    }
}
