import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role_code';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const Public = () => SetMetadata('isPublic', true);
