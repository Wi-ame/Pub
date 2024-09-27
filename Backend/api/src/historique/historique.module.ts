import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriqueStatistiquesService } from './historique.service';
import { HistoriqueStatistiquesController } from './historique.controller';
import { HistoriqueStatistiques } from './historique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriqueStatistiques])],
  providers: [HistoriqueStatistiquesService],
  controllers: [HistoriqueStatistiquesController],
})
export class HistoriqueModule {}
