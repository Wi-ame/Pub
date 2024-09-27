
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  campaign_id: number;

  @Column()
  name: string;

  @Column('decimal')
  budget: number;

  @Column()
  status: string;

  @Column()
  content_type: string;

  @Column()
  content: string; // URL or base64 encoded content

  @Column()
  user_id: string;
  
  @Column({ name: 'start_date', type: 'date' }) // Ensure column name and type match
  start_date: string;

  @Column({ name: 'end_date', type: 'date' }) // Ensure column name and type match
  end_date: string;
}
