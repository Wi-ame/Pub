import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetwork } from './social-networks.entity';
import { SocialNetworkService} from './social-networks.service';
import { SocialNetworksController } from './social-networks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork])],
  providers: [SocialNetworkService],
  controllers: [SocialNetworksController],
  exports: [TypeOrmModule]
})
export class SocialNetworksModule {}
