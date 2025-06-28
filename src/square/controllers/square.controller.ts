import { Controller, Get, Param } from '@nestjs/common';
import { SquareService } from '../services/square.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('square')
@Public()
@Controller('square')
export class SquareController {
    constructor(private readonly squareService: SquareService) {}

    @Get('real-time-votes/:voteTopicId')
    @ApiOperation({ summary: '获取某投票主题的实时投票信息' })
    @ApiParam({ name: 'voteTopicId', description: '投票主题ID', example: '1751096939952' })
    public async getRealTimeVotes(@Param('voteTopicId') voteTopicId: string) {
        return this.squareService.getRealTimeVotes(voteTopicId);
    }
}
