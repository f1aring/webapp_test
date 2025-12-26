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
exports.FollowsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const follow_entity_1 = require("../entities/follow.entity");
let FollowsService = class FollowsService {
    constructor(followRepo) {
        this.followRepo = followRepo;
    }
    async follow(followerId, followingId) {
        if (followerId === followingId)
            return { success: false, message: 'Cannot follow yourself' };
        const exists = await this.followRepo.findOne({ where: { followerId, followingId } });
        if (exists)
            return { success: true };
        const rel = this.followRepo.create({ followerId, followingId });
        await this.followRepo.save(rel);
        return { success: true };
    }
    async unfollow(followerId, followingId) {
        const rel = await this.followRepo.findOne({ where: { followerId, followingId } });
        if (!rel)
            return { success: true };
        await this.followRepo.remove(rel);
        return { success: true };
    }
    async getFollowingIds(userId) {
        const rows = await this.followRepo.find({ where: { followerId: userId } });
        return rows.map(r => r.followingId);
    }
    async isFollowing(followerId, followingId) {
        const rel = await this.followRepo.findOne({ where: { followerId, followingId } });
        return !!rel;
    }
};
exports.FollowsService = FollowsService;
exports.FollowsService = FollowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FollowsService);
//# sourceMappingURL=follows.service.js.map