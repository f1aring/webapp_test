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
exports.MurmursService = void 0;
const common_1 = require("@nestjs/common");
const murmur_repository_1 = require("../repositories/murmur.repository");
const user_repository_1 = require("../repositories/user.repository");
const murmur_enricher_service_1 = require("../services/murmur-enricher.service");
const business_exception_1 = require("../common/exceptions/business.exception");
let MurmursService = class MurmursService {
    constructor(murmurRepository, userRepository, enricherService) {
        this.murmurRepository = murmurRepository;
        this.userRepository = userRepository;
        this.enricherService = enricherService;
    }
    async findById(id, currentUserId) {
        const murmur = await this.murmurRepository.findById(id);
        if (!murmur)
            throw new business_exception_1.ResourceNotFoundException('Murmur');
        const userMap = await this.buildUserMapTyped([murmur.userId]);
        const enriched = await this.enricherService.enrichMurmurs([murmur], userMap, currentUserId);
        return enriched[0];
    }
    async findAll(currentUserId) {
        const murmurs = await this.murmurRepository.findAll();
        const userMap = await this.buildUserMapTyped([...new Set(murmurs.map(m => m.userId))]);
        return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
    }
    async findByUser(userId, currentUserId) {
        const murmurs = await this.murmurRepository.findByUserId(userId);
        const userMap = await this.buildUserMapTyped([userId]);
        return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
    }
    async findByUsers(userIds, currentUserId, limit = 100) {
        const murmurs = await this.murmurRepository.findByUserIds(userIds, limit);
        const userMap = await this.buildUserMapTyped(userIds);
        return this.enricherService.enrichMurmurs(murmurs, userMap, currentUserId);
    }
    async createForUser(userId, dto) {
        const murmur = await this.murmurRepository.create({ userId, content: dto.content });
        const userMap = await this.buildUserMapTyped([userId]);
        const enriched = await this.enricherService.enrichMurmurs([murmur], userMap, userId);
        return enriched[0];
    }
    async deleteForUser(userId, id) {
        const murmur = await this.murmurRepository.findById(id);
        if (!murmur)
            throw new business_exception_1.ResourceNotFoundException('Murmur');
        if (murmur.userId !== userId)
            throw new business_exception_1.ForbiddenException('Cannot delete another user\'s murmur');
        await this.murmurRepository.delete(id);
        return { success: true };
    }
    async buildUserMapTyped(userIds) {
        const uniqueIds = [...new Set(userIds)];
        const users = await Promise.all(uniqueIds.map(id => this.userRepository.findById(id)));
        const filtered = users.filter((u) => u !== null);
        return new Map(filtered.map(u => [u.id, u]));
    }
};
exports.MurmursService = MurmursService;
exports.MurmursService = MurmursService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [murmur_repository_1.MurmurRepository,
        user_repository_1.UserRepository,
        murmur_enricher_service_1.MurmurEnricherService])
], MurmursService);
//# sourceMappingURL=murmurs.service.js.map