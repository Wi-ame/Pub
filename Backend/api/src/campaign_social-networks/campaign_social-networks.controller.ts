import { Controller, Get, Query, ParseIntPipe,Post ,Body} from '@nestjs/common';
import { CampaignSocialNetworksService } from './campaign_social-networks.service';
import { CampaignSocialNetwork } from './campaign_social_networks.entity';

@Controller('campaign-social-networks')
export class CampaignSocialNetworksController {
  constructor(private readonly campaignSocialNetworksService: CampaignSocialNetworksService) {}

  @Get()
  async findByCampaignId(
    @Query('campaign_id', ParseIntPipe) campaignId: number,
  ): Promise<any[]> {
    return this.campaignSocialNetworksService.findByCampaignId(campaignId);
  }


  @Post()
  async createCampaignSocialNetwork(
    @Body('campaign_id') campaignId: number,
    @Body('social_network_id') socialNetworkId: number,
    @Body('day_of_week') dayOfWeek: string,
  ): Promise<CampaignSocialNetwork> {
    console.log('Creating CampaignSocialNetwork with:', { campaignId, socialNetworkId, dayOfWeek });
    return this.campaignSocialNetworksService.createCampaignSocialNetwork(campaignId, socialNetworkId, dayOfWeek);
  }

  
}
