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
let MurmursService = class MurmursService {
    constructor(murmurRepo) {
        this.murmurRepo = murmurRepo;
    }
    findAll() {
        return this.murmurRepo.find({ order: { createdAt: 'DESC' } });
    }
    findByUser(userId) {
        return this.murmurRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    }
    findByUsers(userIds, limit = 100) {
        if (!userIds || userIds.length === 0)
            return Promise.resolve([]);
        return this.murmurRepo.find({ where: { userId: (0, typeorm_2.In)(userIds) }, order: { createdAt: 'DESC' }, take: limit });
    }
    async createForUser(userId, dto) {
        const murmur = this.murmurRepo.create({ userId, content: dto.content });
        return this.murmurRepo.save(murmur);
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MurmursService);
//# sourceMappingURL=murmurs.service.js.map