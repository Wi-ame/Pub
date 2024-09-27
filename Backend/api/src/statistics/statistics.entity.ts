import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('statistiques')
export class Statistiques {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campaign_id: number;

  @Column('int')
  total_impressions: number;

  @Column('int')
  total_clics: string;

  @Column('int')
  total_conversions: number;

  @Column('numeric')
  total_revenu: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}
