import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDetailController } from './organization_detail.controller';
import { OrganizationDetailService } from './organization_detail.service';

describe('OrganizationDetailController', () => {
  let controller: OrganizationDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationDetailController],
      providers: [OrganizationDetailService],
    }).compile();

    controller = module.get<OrganizationDetailController>(OrganizationDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
