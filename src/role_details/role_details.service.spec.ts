import { Test, TestingModule } from '@nestjs/testing';
import { RoleDetailsService } from './role_details.service';

describe('RoleDetailsService', () => {
  let service: RoleDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleDetailsService],
    }).compile();

    service = module.get<RoleDetailsService>(RoleDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
