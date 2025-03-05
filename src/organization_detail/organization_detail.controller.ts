import { Controller } from '@nestjs/common';
import { OrganizationDetailService } from './organization_detail.service';

@Controller('organization-detail')
export class OrganizationDetailController {
  constructor(private readonly organizationDetailService: OrganizationDetailService) {}
}
