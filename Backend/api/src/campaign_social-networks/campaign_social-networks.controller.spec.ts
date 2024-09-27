import { Test, TestingModule } from '@nestjs/testing';
import { CampaignSocialNetworksController } from './campaign_social-networks.controller';

describe('CampaignSocialNetworksController', () => {
  let controller: CampaignSocialNetworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignSocialNetworksController],
    }).compile();

    controller = module.get<CampaignSocialNetworksController>(CampaignSocialNetworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
