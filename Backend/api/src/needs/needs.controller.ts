// src/besoins/besoins.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BesoinsService } from './needs.service';
import { Besoins } from './needs.entity';

@Controller('besoins')
export class BesoinsController {
  constructor(private readonly besoinsService: BesoinsService) {}

  @Post()
  async create(@Body() createBesoinsData: Partial<Besoins>): Promise<Besoins> {
    return this.besoinsService.create(createBesoinsData);
  }

  @Get()
  async findAll(): Promise<Besoins[]> {
    return this.besoinsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Besoins> {
    return this.besoinsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBesoinsData: Partial<Besoins>): Promise<Besoins> {
    return this.besoinsService.update(id, updateBesoinsData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.besoinsService.remove(id);
  }
}
