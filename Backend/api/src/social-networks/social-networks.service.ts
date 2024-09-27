import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SocialNetwork } from './social-networks.entity';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork)
    private readonly socialNetworkRepository: Repository<SocialNetwork>
  ) {}

  async findByIds(ids: number[]): Promise<SocialNetwork[]> {
    return this.socialNetworkRepository.find({
      where: {
        social_network_id: In(ids),
      },
    });
  }

  async findAll(): Promise<SocialNetwork[]> {
    return this.socialNetworkRepository.find();
  }
}
