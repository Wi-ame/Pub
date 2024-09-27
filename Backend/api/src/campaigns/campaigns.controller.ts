import { Controller, Get,Post,Body,BadRequestException,Delete,Param, ParseIntPipe,HttpCode, HttpStatus } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign/campaign';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  findAll(): Promise<Campaign[]> {
    return this.campaignsService.findAll();
  }
  @Get('count')
  async getCampaignCount(): Promise<{ count: number }> {
    const count = await this.campaignsService.getCampaignCount();
    return { count };
  }
  @Post('generate-campaign-id')
  @HttpCode(HttpStatus.OK) // Définit le code de statut HTTP pour la réponse
  async generateCampaignId() {
    try {
      const newId = await this.campaignsService.generateCampaignId();
      return { newId };
    } catch (error) {
      // Gestion d'erreur globale ou gestion personnalisée
      throw new Error('Erreur lors de la génération de l\'ID de campagne.');
    }
  }
  @Post()
  async create(@Body() campaignData: Partial<Campaign>): Promise<Campaign> {
    console.log('Received campaign data:', campaignData);

    // Validation des champs requis
    if (!campaignData.user_id) {
      throw new BadRequestException('User ID is required.');
    }
    if (!campaignData.start_date || !campaignData.end_date) {
      throw new BadRequestException('Start date and end date are required.');
    }

    // Mapper les noms des propriétés si nécessaire
    const mappedCampaignData = {
      ...campaignData,
      start_date: campaignData.start_date, // Assurez-vous que les propriétés sont correctement mappées
      end_date: campaignData.end_date,
    };

    return this.campaignsService.createCampaign(mappedCampaignData);
  }
  @Delete(':id')
  async deleteCampaign(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.campaignsService.deleteCampaign(id);
  }
}
