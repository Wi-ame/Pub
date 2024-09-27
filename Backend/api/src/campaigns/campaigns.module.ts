// campaigns.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign/campaign';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignSocialNetworksModule } from '../campaign_social-networks/campaign_social-networks.module';
import { SocialNetworksModule } from '../social-networks/social-networks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign]),
    forwardRef(() => CampaignSocialNetworksModule), // Utilisation de forwardRef
    SocialNetworksModule,
  ],
  providers: [CampaignsService],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
