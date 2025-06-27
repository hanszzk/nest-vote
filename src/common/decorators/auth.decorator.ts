
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { decoratorConstants } from '../constants/decorator.constants';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        SetMetadata(decoratorConstants.ROLES_KEY, roles),
        UseGuards(AuthGuard, RolesGuard),
        // TODO: Add swagger
        // ApiBearerAuth(),
        // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
