export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface Murmur {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user?: User;
}

export interface Follow {
  id: number;
  followerId: number;
  followingId: number;
}

export interface Like {
  id: number;
  userId: number;
  murmurId: number;
  createdAt: string;
}

