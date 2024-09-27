import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('social_networks')
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  social_network_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;
}