import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDetailService } from './organization_detail.service';

describe('OrganizationDetailService', () => {
  let service: OrganizationDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationDetailService],
    }).compile();

    service = module.get<OrganizationDetailService>(OrganizationDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
