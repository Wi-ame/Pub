import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistiques } from './statistics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Statistiques])],
  controllers: [StatisticsController],
  providers: [StatisticsService]
})
export class StatisticsModule {}
