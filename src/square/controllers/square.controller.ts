import { Controller, Get, Param } from '@nestjs/common';
import { SquareService } from '../services/square.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('square')
export class SquareController {
    constructor(private readonly squareService: SquareService) {}

    @Get('real-time-votes/:voteTopicId')
    public async getRealTimeVotes(@Param('voteTopicId') voteTopicId: string) {
        return this.squareService.getRealTimeVotes(voteTopicId);
    }
}
