import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from './roles.decorator';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(AuthGuard, RolesGuard),
        // TODO: Add swagger
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
