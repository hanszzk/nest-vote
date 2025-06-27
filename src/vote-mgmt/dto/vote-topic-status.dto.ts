import { IsIn, IsNotEmpty, Length } from "class-validator";
import { commonConstants } from "src/common/constants/common.constants";

export class VoteTopicStatusDto {
    @IsNotEmpty()
    voteTopicId: string;

    @IsNotEmpty()
    @Length(1, 5)
    @IsIn([commonConstants.NOT_STASTUS, commonConstants.IN_PROGRESS, commonConstants.FINISHED])
    status: string;
}