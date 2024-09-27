import { Injectable,BadRequestException , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign/campaign';
import { CampaignSocialNetworksService } from '../campaign_social-networks/campaign_social-networks.service'; // Assurez-vous d'importer ce service


@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
    private readonly campaignSocialNetworksService: CampaignSocialNetworksService,
  ) {}

  async findAll(): Promise<Campaign[]> {
    return this.campaignsRepository.find();
  }

  async getCampaignCount(): Promise<number> {
    return this.campaignsRepository.count();
  }
  async createCampaign(campaignData: Partial<Campaign>): Promise<Campaign> {
    // Validation des données
    if (!campaignData.user_id) {
      throw new BadRequestException('User ID is required.');
    }

    // Création et sauvegarde de la campagne
    const campaign = this.campaignsRepository.create(campaignData);
    return this.campaignsRepository.save(campaign);
  }

  async deleteCampaign(campaign_id: number): Promise<void> {
    console.log(`Trying to delete campaign with ID: ${campaign_id}`);
    
    const campaign = await this.campaignsRepository.findOne({ where: { campaign_id } });
    
    if (!campaign) {
      console.log(`Campaign with ID ${campaign_id} not found.`);
      throw new NotFoundException('Campaign not found.');
    }
  
    console.log(`Deleting campaign with ID: ${campaign_id}`);
    
    await this.campaignSocialNetworksService.deleteByCampaignId(campaign_id);
    await this.campaignsRepository.remove(campaign);
    console.log(`Campaign with ID ${campaign_id} deleted successfully.`);
  }
 
  
  
  async generateCampaignId(): Promise<number> {
    try {
      // Trouver la campagne avec le plus grand ID en triant par ID décroissant et en limitant les résultats à 1
      const campaigns = await this.campaignsRepository.find({
        order: { campaign_id: 'DESC' }, // Trie par ID décroissant
        take: 1, // Limiter à un seul résultat
      });
  
      // La première campagne dans le tableau (la plus récente)
      const lastCampaign = campaigns[0];
  
      console.log('Dernière campagne trouvée:', lastCampaign);
  
      // Détermine le nouvel ID basé sur l'ID de la dernière campagne
      const newId = lastCampaign ? lastCampaign.campaign_id + 1 : 1;
      console.log('Nouveau ID généré:', newId);
  
      return newId;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'ID de campagne:', error);
      throw new Error('Erreur lors de la génération de l\'ID de campagne');
    }
  }
  
  
  
  
}
