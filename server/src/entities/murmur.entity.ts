import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Murmur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column('text')
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
