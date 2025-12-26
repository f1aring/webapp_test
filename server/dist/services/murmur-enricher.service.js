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
exports.MurmurEnricherService = void 0;
const common_1 = require("@nestjs/common");
const like_repository_1 = require("../repositories/like.repository");
let MurmurEnricherService = class MurmurEnricherService {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    async enrichMurmurs(murmurs, userMap, currentUserId) {
        if (murmurs.length === 0)
            return [];
        const murmurIds = murmurs.map(m => m.id);
        const likeCounts = await this.getLikeCounts(murmurIds);
        const userLikes = await this.getUserLikes(murmurIds, currentUserId);
        return murmurs.map(murmur => ({
            ...murmur,
            user: userMap.get(murmur.userId),
            likeCount: likeCounts.get(murmur.id) || 0,
            isLiked: userLikes.has(murmur.id),
        }));
    }
    async getLikeCounts(murmurIds) {
        const counts = new Map();
        for (const murmurId of murmurIds) {
            counts.set(murmurId, await this.likeRepository.countByMurmur(murmurId));
        }
        return counts;
    }
    async getUserLikes(murmurIds, currentUserId) {
        const likes = new Set();
        if (!currentUserId)
            return likes;
        for (const murmurId of murmurIds) {
            const isLiked = await this.likeRepository.isLiked(currentUserId, murmurId);
            if (isLiked)
                likes.add(murmurId);
        }
        return likes;
    }
};
exports.MurmurEnricherService = MurmurEnricherService;
exports.MurmurEnricherService = MurmurEnricherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [like_repository_1.LikeRepository])
], MurmurEnricherService);
//# sourceMappingURL=murmur-enricher.service.js.map