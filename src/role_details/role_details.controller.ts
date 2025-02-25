import { Controller } from '@nestjs/common';
import { RoleDetailsService } from './role_details.service';

@Controller('role-details')
export class RoleDetailsController {
  constructor(private readonly roleDetailsService: RoleDetailsService) {}
}
