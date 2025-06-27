
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { decoratorConstants } from '../constants/decorator.constants';

export const Roles = (...roles: Role[]) => SetMetadata(decoratorConstants.ROLES_KEY, roles);
