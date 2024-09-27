// user.service.ts
import { Injectable,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getCount(): Promise<number> {
    const count = await this.usersRepository.count();
    return count;
  }


  async create(user: User): Promise<User> {
    // Vérifier et enregistrer les données
    console.log('Creating user:', user); // Ajouter ce log pour déboguer
    return this.usersRepository.save(user);
  }
  async findByCin(cin: string): Promise<User> {
    return this.usersRepository.findOne({ where: { cin } });
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async update(cin: string, updatedUser: Partial<User>): Promise<User | undefined> {
    const user = await this.findByCin(cin);
    if (!user) {
      return undefined;
    }

    // Check if there's a password to be updated
    if (updatedUser.password) {
      // Hash the new password
      updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    }

    // Merge updated values into user
    Object.assign(user, updatedUser);

    // Save the updated user
    return this.usersRepository.save(user);
  }
  async deleteUser(cin: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { cin } });
    if (user) {
      await this.usersRepository.remove(user);
    }
  }
}
