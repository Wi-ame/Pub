// src/besoins/besoins.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('besoins')
export class Besoins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 }) // Update length as needed
  client_id: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_soumission: Date;

  @Column({ type: 'varchar', length: 50, default: 'En attente' })
  statut: string;

  @Column({ type: 'int', nullable: true })
  campagne_id: number;
}
