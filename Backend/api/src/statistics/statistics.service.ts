import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistiques } from './statistics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {

    constructor(
        @InjectRepository(Statistiques)
        private statisticRepository: Repository<Statistiques>,
      ) {}

      async findAll(): Promise<Statistiques[]> {
        return this.statisticRepository.find();
      }

      async findOne(id: number): Promise<Statistiques | null> {
        return this.statisticRepository.findOne({ where: { id } });
      }
}
