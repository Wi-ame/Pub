// auth.controller.ts
import { Controller, Post, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('logout')
  async logout(@Res() res: Response) {
    // Effacer le cookie contenant le token JWT
    res.clearCookie('access_token', { httpOnly: true, sameSite: 'strict' }); // Assurez-vous que le nom du cookie correspond à celui que vous utilisez

    // Répondre avec un message de succès
    res.status(HttpStatus.OK).json({ message: 'Déconnexion réussie.' });
  }
}
