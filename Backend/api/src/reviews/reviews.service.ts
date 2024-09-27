import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,MoreThanOrEqual } from 'typeorm';
import { Reviews} from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private reviewsRepository: Repository<Reviews>,
  ) {}

  async findAll(): Promise<Reviews[]> {
    return this.reviewsRepository.find();
  }

  async findOne(id: number): Promise<Reviews | null> {
    return this.reviewsRepository.findOne({ where: { id } });
  }

  async create(reviewData: Partial<Reviews>): Promise<Reviews> {
    const review = this.reviewsRepository.create(reviewData);
    return this.reviewsRepository.save(review);
  }

  async update(id: number, updateData: Partial<Reviews>): Promise<Reviews | null> {
    await this.reviewsRepository.update(id, updateData);
    return this.reviewsRepository.findOne({ where: { id } });
  }
 
  async countReviews(): Promise<number> {
    return this.reviewsRepository.count();
  }

  async countPositiveReviews(): Promise<number> {
    return this.reviewsRepository.count({
      where: {
        rating: MoreThanOrEqual(3),
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.reviewsRepository.delete(id);
  }
}
