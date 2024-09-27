// campaign_social-networks.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignSocialNetwork } from './campaign_social_networks.entity';
import { SocialNetwork } from '../social-networks/social-networks.entity';

@Injectable()
export class CampaignSocialNetworksService {
  constructor(
    @InjectRepository(CampaignSocialNetwork)
    private readonly campaignSocialNetworkRepository: Repository<CampaignSocialNetwork>,
    @InjectRepository(SocialNetwork)
    private readonly socialNetworkRepository: Repository<SocialNetwork>
  ) {}

  async findByCampaignId(campaignId: number) {
    const campaignSocialNetworks = await this.campaignSocialNetworkRepository.find({ where: { campaign_id: campaignId } });
    
    const result = [];
    for (const csn of campaignSocialNetworks) {
      const socialNetwork = await this.socialNetworkRepository.findOne({ where: { social_network_id: csn.social_network_id } });
      result.push({
        ...csn,
        socialNetworkName: socialNetwork ? socialNetwork.name : 'Unknown'
      });
    }

    return result;
  }

  async createCampaignSocialNetwork(campaignId: number, socialNetworkId: number, dayOfWeek: string): Promise<CampaignSocialNetwork> {
    const campaignSocialNetwork = this.campaignSocialNetworkRepository.create({
      campaign_id: campaignId,
      social_network_id: socialNetworkId,
      day_of_week: dayOfWeek,
    });
    return this.campaignSocialNetworkRepository.save(campaignSocialNetwork);
  }
  async deleteByCampaignId(campaign_id: number): Promise<void> {
    await this.campaignSocialNetworkRepository.delete({ campaign_id });
  }

}
