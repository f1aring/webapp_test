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
exports.MurmursService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const murmur_entity_1 = require("../entities/murmur.entity");
const user_entity_1 = require("../entities/user.entity");
const like_entity_1 = require("../entities/like.entity");
let MurmursService = class MurmursService {
    constructor(murmurRepo, userRepo, likeRepo) {
        this.murmurRepo = murmurRepo;
        this.userRepo = userRepo;
        this.likeRepo = likeRepo;
    }
    async enrichMurmurs(murmurs, currentUserId) {
        const userIds = [...new Set(murmurs.map(m => m.userId))];
        const users = await this.userRepo.find({ where: { id: (0, typeorm_2.In)(userIds) } });
        const userMap = new Map(users.map(u => [u.id, u]));
        const murmurIds = murmurs.map(m => m.id);
        const likes = murmurIds.length > 0
            ? await this.likeRepo.find({ where: { murmurId: (0, typeorm_2.In)(murmurIds) } })
            : [];
        const likeCounts = new Map();
        const userLikes = new Map();
        likes.forEach(like => {
            likeCounts.set(like.murmurId, (likeCounts.get(like.murmurId) || 0) + 1);
            if (!userLikes.has(like.murmurId)) {
                userLikes.set(like.murmurId, new Set());
            }
            userLikes.get(like.murmurId).add(like.userId);
        });
        return murmurs.map(murmur => ({
            ...murmur,
            user: userMap.get(murmur.userId),
            likeCount: likeCounts.get(murmur.id) || 0,
            isLiked: currentUserId ? userLikes.get(murmur.id)?.has(currentUserId) : false,
        }));
    }
    async findById(id, currentUserId) {
        const murmur = await this.murmurRepo.findOne({ where: { id } });
        if (!murmur)
            throw new common_1.NotFoundException('Murmur not found');
        const enriched = await this.enrichMurmurs([murmur], currentUserId);
        return enriched[0];
    }
    async findAll(currentUserId) {
        const murmurs = await this.murmurRepo.find({ order: { createdAt: 'DESC' } });
        return this.enrichMurmurs(murmurs, currentUserId);
    }
    async findByUser(userId, currentUserId) {
        const murmurs = await this.murmurRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
        return this.enrichMurmurs(murmurs, currentUserId);
    }
    async findByUsers(userIds, currentUserId, limit = 100) {
        if (!userIds || userIds.length === 0)
            return Promise.resolve([]);
        const murmurs = await this.murmurRepo.find({
            where: { userId: (0, typeorm_2.In)(userIds) },
            order: { createdAt: 'DESC' },
            take: limit
        });
        return this.enrichMurmurs(murmurs, currentUserId);
    }
    async createForUser(userId, dto) {
        const murmur = this.murmurRepo.create({ userId, content: dto.content });
        const saved = await this.murmurRepo.save(murmur);
        return this.enrichMurmurs([saved], userId).then(arr => arr[0]);
    }
    async deleteForUser(userId, id) {
        const murmur = await this.murmurRepo.findOne({ where: { id } });
        if (!murmur)
            throw new common_1.NotFoundException('Murmur not found');
        if (murmur.userId !== userId)
            throw new common_1.ForbiddenException();
        await this.murmurRepo.remove(murmur);
        return { success: true };
    }
};
exports.MurmursService = MurmursService;
exports.MurmursService = MurmursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MurmursService);
//# sourceMappingURL=murmurs.service.js.map