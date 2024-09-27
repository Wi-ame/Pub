// src/besoins/besoins.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Besoins } from './needs.entity';

@Injectable()
export class BesoinsService {
  constructor(
    @InjectRepository(Besoins)
    private readonly besoinsRepository: Repository<Besoins>,
  ) {}

  async create(createBesoinsData: Partial<Besoins>): Promise<Besoins> {
    const besoins = this.besoinsRepository.create(createBesoinsData);
    return this.besoinsRepository.save(besoins);
  }

  async findAll(): Promise<Besoins[]> {
    return this.besoinsRepository.find();
  }

  async findOne(id: number): Promise<Besoins> {
    const options: FindOneOptions<Besoins> = { where: { id } };
    return this.besoinsRepository.findOne(options);
  }

  async update(id: number, updateBesoinsData: Partial<Besoins>): Promise<Besoins> {
    await this.besoinsRepository.update(id, updateBesoinsData);
    return this.besoinsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.besoinsRepository.delete(id);
  }
}
