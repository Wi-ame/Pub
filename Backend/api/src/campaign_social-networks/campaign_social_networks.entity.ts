import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Campaign } from '../campaigns/entities/campaign/campaign';
import { SocialNetwork } from '../social-networks/social-networks.entity';

@Entity('campaign_social_networks')
export class CampaignSocialNetwork {
  @PrimaryColumn()
  campaign_id: number;

  @PrimaryColumn()
  social_network_id: number;

  @Column()
  day_of_week: string;

}
