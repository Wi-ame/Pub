import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './reviews.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reviews])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],  // Exporte ReviewsService pour d'autres modules si nécessaire
})
export class ReviewsModule {}
