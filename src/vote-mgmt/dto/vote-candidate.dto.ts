import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

export class VoteCandidateDto {
    @ApiProperty({ description: '候选人ID', example: 'candidate-001' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: '投票主题ID', example: '1751096939952' })
    voteTopicId: string;

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ description: '候选人SSN', maxLength: 50, example: '123456789' })
    ssn: string;

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ description: '候选人姓名', maxLength: 50, example: 'zzk' })
    name: string;

    @ApiHideProperty()
    totalVotes: number; // 总得票数

    @ApiHideProperty()
    voteUserList?: UserDto[]; // 记录投票的用户列表
}
