import { Test, TestingModule } from '@nestjs/testing';
import { RoleDetailsController } from './role_details.controller';
import { RoleDetailsService } from './role_details.service';

describe('RoleDetailsController', () => {
  let controller: RoleDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleDetailsController],
      providers: [RoleDetailsService],
    }).compile();

    controller = module.get<RoleDetailsController>(RoleDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
