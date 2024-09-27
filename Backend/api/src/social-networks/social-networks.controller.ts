import { Controller, Get, Query } from '@nestjs/common';
import { SocialNetworkService } from './social-networks.service';
import { SocialNetwork } from './social-networks.entity';

@Controller('social-networks')
export class SocialNetworksController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @Get('by-ids')
  async findByIds(@Query('ids') ids: string): Promise<SocialNetwork[]> {
    const idsArray = ids.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (idsArray.length === 0) {
      return [];
    }
    return this.socialNetworkService.findByIds(idsArray);
  }

  @Get()
  async findAll(): Promise<SocialNetwork[]> {
    return this.socialNetworkService.findAll();
  }
}
