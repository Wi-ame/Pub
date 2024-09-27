// user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module'; // Importez AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),  // Ajoutez AuthModule ici
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Ajoutez UserService ici pour l'exporter
})
export class UserModule {}
