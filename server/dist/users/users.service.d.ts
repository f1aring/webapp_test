import { UserRepository } from '../repositories/user.repository';
import { FollowRepository } from '../repositories/follow.repository';
export declare class UsersService {
    private readonly userRepository;
    private readonly followRepository;
    constructor(userRepository: UserRepository, followRepository: FollowRepository);
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findById(id: number): Promise<{
        followCount: number;
        followedCount: number;
        id: number;
        name: string;
        email: string;
        password: string;
        isActive: boolean;
    }>;
}
