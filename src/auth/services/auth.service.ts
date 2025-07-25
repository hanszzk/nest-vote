import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from 'src/common/model/result.model';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(name: string, ssn: string) {
        const user = await this.usersService.findOne(ssn);
        if (!user || user.name !== name || user.ssn !== ssn) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.ssn, name: user.name };
        const token = await this.jwtService.signAsync(payload);

        return Result.suc({ token });
    }
}
