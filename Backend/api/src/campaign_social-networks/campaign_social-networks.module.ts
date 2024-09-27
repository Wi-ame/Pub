// campaign_social-networks.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignSocialNetwork } from './campaign_social_networks.entity';
import { CampaignSocialNetworksService } from './campaign_social-networks.service';
import { CampaignSocialNetworksController } from './campaign_social-networks.controller';
import { SocialNetworksModule } from '../social-networks/social-networks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignSocialNetwork]),
    SocialNetworksModule, // Assurez-vous que ce module est nécessaire ici
  ],
  providers: [CampaignSocialNetworksService],
  controllers: [CampaignSocialNetworksController],
  exports: [CampaignSocialNetworksService],
})
export class CampaignSocialNetworksModule {}
