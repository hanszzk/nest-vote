import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decoratorConstants } from 'src/common/constants/decorator.constants';
import { Role } from 'src/common/enums/role.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(decoratorConstants.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const request: ExpressRequest & { user: UserDto } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => request.user?.roles?.includes(role));
    }
}
