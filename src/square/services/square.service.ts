import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Result } from 'src/common/interfaces/result.interface';
import { VoteMgmtService } from 'src/vote-mgmt/services/vote-mgmt.service';
import { commonConstants } from 'src/common/constants/common.constants';

@Injectable()
export class SquareService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly voteMgmtService: VoteMgmtService,
    ) {}

    async getRealTimeVotes(voteTopicId: string) {
        //  查询实时票数（仅在投票进⾏中可⽤）
        const voteTopic = await this.voteMgmtService.findVoteTopicById(voteTopicId);
        if (voteTopic?.status !== commonConstants.IN_PROGRESS) {
            return Result.fail('Vote topic is not in progress');
        }
        await this.voteMgmtService.countVotes(voteTopic);

        return Result.suc(voteTopic);
    }
}
