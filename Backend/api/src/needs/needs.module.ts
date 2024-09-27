import { Module } from '@nestjs/common';
import { BesoinsService } from './needs.service';
import { BesoinsController } from './needs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Besoins } from './needs.entity';

@Module({ imports: [TypeOrmModule.forFeature([Besoins])],
  providers: [BesoinsService],
  controllers: [BesoinsController]
})
export class NeedsModule {}
