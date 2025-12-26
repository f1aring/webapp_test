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
exports.MurmurRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const murmur_entity_1 = require("../entities/murmur.entity");
let MurmurRepository = class MurmurRepository {
    constructor(repo) {
        this.repo = repo;
    }
    async findById(id) {
        return this.repo.findOne({ where: { id } });
    }
    async findByUserId(userId, limit = 100) {
        return this.repo.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async findByUserIds(userIds, limit = 100) {
        if (!userIds || userIds.length === 0)
            return [];
        return this.repo.find({
            where: { userId: (0, typeorm_2.In)(userIds) },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async findAll(limit = 100) {
        return this.repo.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async create(murmur) {
        const newMurmur = this.repo.create(murmur);
        return this.repo.save(newMurmur);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
    async count(userId) {
        if (userId) {
            return this.repo.count({ where: { userId } });
        }
        return this.repo.count();
    }
};
exports.MurmurRepository = MurmurRepository;
exports.MurmurRepository = MurmurRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MurmurRepository);
//# sourceMappingURL=murmur.repository.js.map