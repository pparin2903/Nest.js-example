import { Test, TestingModule } from '@nestjs/testing';
import { HelpdeskGateway } from './helpdesk.gateway';

describe('HelpdeskGateway', () => {
  let gateway: HelpdeskGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelpdeskGateway],
    }).compile();

    gateway = module.get<HelpdeskGateway>(HelpdeskGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
