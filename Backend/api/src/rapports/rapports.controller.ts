import { Controller, Get, Query,Post,Body } from '@nestjs/common';
import { RapportService } from './rapports.service';
import { Rapport } from './rapports.entity';

@Controller('api/reports')
export class RapportController {
  constructor(private readonly rapportService: RapportService) {}

  
  @Get('count')
  async getReportCount(): Promise<{ count: number }> {
    const count = await this.rapportService.getReportCount();
    return { count };
  }
  @Post()
  async createReport(@Body() rapportData: Partial<Rapport>) {
    return await this.rapportService.createReport(rapportData);
  }
  @Get()
  async getReports(@Query('type_rapport') typeRapport: string, @Query('analyst_id') analystId: string) {
    if (analystId) {
      return this.rapportService.getReportsByAnalyst(analystId);
    }
    return this.rapportService.getReportsByType(typeRapport);
  }
}
