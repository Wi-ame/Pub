import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RapportController} from './rapports.controller';
import {RapportService } from './rapports.service';
import { Rapport } from './rapports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rapport])],
  controllers: [RapportController],
  providers: [RapportService],
})
export class RapportsModule {}
