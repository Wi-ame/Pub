import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('historique_statistiques')
export class HistoriqueStatistiques {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campaign_id: number;


  @Column('int')
  total_impressions: number;

  @Column('int')
  total_clics: number;

  @Column('int')
  total_conversions: number;

  @Column('decimal')
  total_revenu: number;
  
  @Column()
  date: string;
}
