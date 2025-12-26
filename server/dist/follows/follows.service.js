"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsService = void 0;
const common_1 = require("@nestjs/common");
const follow_repository_1 = require("../repositories/follow.repository");
const business_exception_1 = require("../common/exceptions/business.exception");
let FollowsService = class FollowsService {
    constructor(followRepository) {
        this.followRepository = followRepository;
    }
    async follow(followerId, followingId) {
        if (followerId === followingId) {
            throw new business_exception_1.BusinessException('Cannot follow yourself');
        }
        await this.followRepository.follow(followerId, followingId);
        return { success: true };
    }
    async unfollow(followerId, followingId) {
        await this.followRepository.unfollow(followerId, followingId);
        return { success: true };
    }
    async getFollowingIds(userId) {
        return this.followRepository.getFollowingIds(userId);
    }
    async isFollowing(followerId, followingId) {
        return this.followRepository.isFollowing(followerId, followingId);
    }
    async getFollowerIds(userId) {
        return this.followRepository.getFollowerIds(userId);
    }
    async countFollowing(userId) {
        return this.followRepository.countFollowing(userId);
    }
    async countFollowers(userId) {
        return this.followRepository.countFollowers(userId);
    }
};
exports.FollowsService = FollowsService;
exports.FollowsService = FollowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [follow_repository_1.FollowRepository])
], FollowsService);
//# sourceMappingURL=follows.service.js.map