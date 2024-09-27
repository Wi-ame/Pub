import { Test, TestingModule } from '@nestjs/testing';
import { CampaignSocialNetworksService } from './campaign_social-networks.service';

describe('CampaignSocialNetworksService', () => {
  let service: CampaignSocialNetworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignSocialNetworksService],
    }).compile();

    service = module.get<CampaignSocialNetworksService>(CampaignSocialNetworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
