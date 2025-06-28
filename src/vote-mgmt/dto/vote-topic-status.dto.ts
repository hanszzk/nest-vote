import { IsIn, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { commonConstants } from 'src/common/constants/common.constants';

export class VoteTopicStatusDto {
    @IsNotEmpty()
    @ApiProperty({ description: '投票主题ID', example: '1751096939952' })
    voteTopicId: string;

    @IsNotEmpty()
    @Length(1, 5)
    @IsIn([commonConstants.NOT_STASTUS, commonConstants.IN_PROGRESS, commonConstants.FINISHED])
    @ApiProperty({
        description: '投票主题状态',
        example: commonConstants.IN_PROGRESS,
        enum: [commonConstants.NOT_STASTUS, commonConstants.IN_PROGRESS, commonConstants.FINISHED],
    })
    status: string;
}
