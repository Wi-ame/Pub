// user.entity.ts
import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('User')
export class User {
  @PrimaryColumn()
  cin: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  tel: string;

  @Column()
  role: string;

  @Column()
  sex: string;

  @Column()
  person_type: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  company_name: string;

  @Column()
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
