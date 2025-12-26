// Repository interfaces for dependency inversion

import { User } from '../../entities/user.entity';
import { Murmur } from '../../entities/murmur.entity';
import { Like } from '../../entities/like.entity';
import { Follow } from '../../entities/follow.entity';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: Partial<User>): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User>;
}

export interface IMurmurRepository {
  findById(id: number): Promise<Murmur | null>;
  findByUserId(userId: number, limit?: number): Promise<Murmur[]>;
  findByUserIds(userIds: number[], limit?: number): Promise<Murmur[]>;
  findAll(limit?: number): Promise<Murmur[]>;
  create(murmur: Partial<Murmur>): Promise<Murmur>;
  delete(id: number): Promise<void>;
  count(userId?: number): Promise<number>;
}

export interface ILikeRepository {
  like(userId: number, murmurId: number): Promise<void>;
  unlike(userId: number, murmurId: number): Promise<void>;
  isLiked(userId: number, murmurId: number): Promise<boolean>;
  countByMurmur(murmurId: number): Promise<number>;
  findByMurmur(murmurId: number): Promise<Like[]>;
}

export interface IFollowRepository {
  follow(followerId: number, followingId: number): Promise<void>;
  unfollow(followerId: number, followingId: number): Promise<void>;
  isFollowing(followerId: number, followingId: number): Promise<boolean>;
  getFollowingIds(userId: number): Promise<number[]>;
  getFollowerIds(userId: number): Promise<number[]>;
  countFollowing(userId: number): Promise<number>;
  countFollowers(userId: number): Promise<number>;
}

export const REPOSITORIES = {
  USER: 'IUserRepository',
  MURMUR: 'IMurmurRepository',
  LIKE: 'ILikeRepository',
  FOLLOW: 'IFollowRepository',
};
