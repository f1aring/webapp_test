import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  followerId!: number;

  @Column()
  followingId!: number;
}
