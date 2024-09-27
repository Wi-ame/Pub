import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rapport } from './rapports.entity'; // Entité correspondant aux rapports

@Injectable()
export class RapportService {
  constructor(
    @InjectRepository(Rapport)
    private readonly rapportRepository: Repository<Rapport>,
  ) {}

 
  async getReportCount(): Promise<number> {
    return this.rapportRepository.count();
  }
  async createReport(rapportData: Partial<Rapport>): Promise<Rapport> {
    const newRapport = this.rapportRepository.create(rapportData);
    return await this.rapportRepository.save(newRapport);
  }
  async getReportsByType(typeRapport: string): Promise<Rapport[]> {
    return this.rapportRepository.find({ where: { type_rapport: typeRapport } });
  }

  async getReportsByAnalyst(analystId: string): Promise<Rapport[]> {
    return this.rapportRepository.find({ where: { analyst_id: analystId } });
  }
}
