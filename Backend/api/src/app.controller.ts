import { Controller, Get, Logger } from '@nestjs/common';

const logger = new Logger('AppController');

@Controller('app')
export class AppController {
  constructor() {}

  @Get()
  async getAppInfo() {
    logger.log('Getting application info');
    return { message: 'Welcome to my NestJS application' };
  }
}
