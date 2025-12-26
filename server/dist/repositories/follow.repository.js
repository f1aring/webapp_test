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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const follow_entity_1 = require("../entities/follow.entity");
let FollowRepository = class FollowRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async follow(followerId, followingId) {
        const exists = await this.isFollowing(followerId, followingId);
        if (!exists) {
            const follow = this.repo.create({ followerId, followingId });
            await this.repo.save(follow);
        }
    }
    async unfollow(followerId, followingId) {
        await this.repo.delete({ followerId, followingId });
    }
    async isFollowing(followerId, followingId) {
        const follow = await this.repo.findOne({ where: { followerId, followingId } });
        return !!follow;
    }
    async getFollowingIds(userId) {
        const follows = await this.repo.find({ where: { followerId: userId } });
        return follows.map(f => f.followingId);
    }
    async getFollowerIds(userId) {
        const follows = await this.repo.find({ where: { followingId: userId } });
        return follows.map(f => f.followerId);
    }
    async countFollowing(userId) {
        return this.repo.count({ where: { followerId: userId } });
    }
    async countFollowers(userId) {
        return this.repo.count({ where: { followingId: userId } });
    }
};
exports.FollowRepository = FollowRepository;
exports.FollowRepository = FollowRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FollowRepository);
//# sourceMappingURL=follow.repository.js.map