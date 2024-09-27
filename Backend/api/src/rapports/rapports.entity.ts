import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('rapports')
export class Rapport {
  @PrimaryGeneratedColumn()
  rapport_id: number;


  @Column()
  campaign_id: number;

  @Column()
  analyst_id: string;

  @Column('text')
  contenu: string;

  @Column({ type: 'varchar', length: 50 })
  type_rapport: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_creation: Date;
}
