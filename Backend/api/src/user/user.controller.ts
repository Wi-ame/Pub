import { Controller, Get, Param, UseGuards ,Put,Body,Post,Delete} from '@nestjs/common';
import { UserService } from './user.service';;
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':cin')
  async getUserByCin(@Param('cin') cin: string) {
    return this.userService.findByCin(cin);
  }
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
  @Get('email/:email')
  async checkEmailExists(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return { exists: !!user };
  }
  @Put(':cin')
  async updateUser(
    @Param('cin') cin: string,
    @Body() updatedUser: Partial<User>,
  ) {
    return this.userService.update(cin, updatedUser);
  }
  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    console.log('Received user data:', userData);
    return this.userService.create(userData);
  }

  @Get('count')
  async getCount() {
    return { count: 42 }; // Valeur fixe pour tester
  }

  @Delete(':cin')
  async remove(@Param('cin') cin: string) {
    return this.userService.deleteUser(cin);
  }
  @Get('profile/:cin') // Ajout du endpoint pour récupérer le profil de l'utilisateur
  async getUserProfile(@Param('cin') cin: string) {
    return this.userService.findByCin(cin); // Vous pouvez inclure le rôle dans la réponse
  }
}
