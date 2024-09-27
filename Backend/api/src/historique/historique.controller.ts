import { Controller, Get, Param } from '@nestjs/common';
import { HistoriqueStatistiquesService } from './historique.service';

@Controller('historique')
export class HistoriqueStatistiquesController {
  constructor(
    private readonly historiqueStatistiquesService: HistoriqueStatistiquesService,
  ) {}

  @Get(':campaignId/statistics')
  async getStatisticsByCampaignId(@Param('campaignId') campaignId: number) {
    const stats = await this.historiqueStatistiquesService.findByCampaignId(campaignId);
    console.log('Statistics fetched:', stats); // Ajoutez cette ligne
    return stats;
  }
}
