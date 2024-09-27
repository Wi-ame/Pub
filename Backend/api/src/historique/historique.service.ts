import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriqueStatistiques } from './historique.entity';

@Injectable()
export class HistoriqueStatistiquesService {
  constructor(
    @InjectRepository(HistoriqueStatistiques)
    private readonly historiqueStatistiquesRepository: Repository<HistoriqueStatistiques>,
  ) {}

  async findByCampaignId(campaignId: number): Promise<HistoriqueStatistiques[]> {
    return this.historiqueStatistiquesRepository.find({ where: { campaign_id: campaignId } });
  }
}
