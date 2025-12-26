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
exports.LikeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("../entities/like.entity");
let LikeRepository = class LikeRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async like(userId, murmurId) {
        const exists = await this.isLiked(userId, murmurId);
        if (!exists) {
            const like = this.repo.create({ userId, murmurId });
            await this.repo.save(like);
        }
    }
    async unlike(userId, murmurId) {
        await this.repo.delete({ userId, murmurId });
    }
    async isLiked(userId, murmurId) {
        const like = await this.repo.findOne({ where: { userId, murmurId } });
        return !!like;
    }
    async countByMurmur(murmurId) {
        return this.repo.count({ where: { murmurId } });
    }
    async findByMurmur(murmurId) {
        return this.repo.find({ where: { murmurId } });
    }
};
exports.LikeRepository = LikeRepository;
exports.LikeRepository = LikeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LikeRepository);
//# sourceMappingURL=like.repository.js.map