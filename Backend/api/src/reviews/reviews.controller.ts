import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Reviews } from './reviews.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(): Promise<Reviews[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reviews> {
    return this.reviewsService.findOne(id);
  }

  @Post()
  create(@Body() reviewData: Partial<Reviews>): Promise<Reviews> {
    return this.reviewsService.create(reviewData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Reviews>): Promise<Reviews> {
    return this.reviewsService.update(id, updateData);
  }
  @Get('percentage/positive')
  async getPositiveReviewsPercentage(): Promise<{ percentage: number }> {
    const totalReviews = await this.reviewsService.countReviews();
    const positiveReviews = await this.reviewsService.countPositiveReviews();
    const percentage = totalReviews > 0 ? (positiveReviews / totalReviews) * 100 : 0;
    return { percentage };
  }
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.reviewsService.delete(id);
  }
}
