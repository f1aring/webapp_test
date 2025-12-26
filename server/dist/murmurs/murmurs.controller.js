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
exports.MurmursController = void 0;
const common_1 = require("@nestjs/common");
const murmurs_service_1 = require("./murmurs.service");
const create_murmur_dto_1 = require("./dto/create-murmur.dto");
const follows_service_1 = require("../follows/follows.service");
let MurmursController = class MurmursController {
    constructor(murmursService, followsService) {
        this.murmursService = murmursService;
        this.followsService = followsService;
    }
    getAll(xUserId) {
        const currentUserId = xUserId ? Number(xUserId) : undefined;
        return this.murmursService.findAll(currentUserId);
    }
    getByUser(id, xUserId) {
        const currentUserId = xUserId ? Number(xUserId) : undefined;
        return this.murmursService.findByUser(Number(id), currentUserId);
    }
    async timeline(xUserId) {
        const userId = xUserId ? Number(xUserId) : undefined;
        if (!userId)
            return { error: 'Missing x-user-id header' };
        const following = await this.followsService.getFollowingIds(userId);
        const ids = [userId, ...following];
        return this.murmursService.findByUsers(ids, userId);
    }
    createForMe(xUserId, body) {
        const userId = xUserId ? Number(xUserId) : body.userId;
        if (!userId) {
            return { error: 'Missing x-user-id header or body.userId' };
        }
        return this.murmursService.createForUser(userId, body);
    }
    deleteForMe(xUserId, id) {
        const userId = xUserId ? Number(xUserId) : undefined;
        if (!userId) {
            return { error: 'Missing x-user-id header' };
        }
        return this.murmursService.deleteForUser(userId, id);
    }
};
exports.MurmursController = MurmursController;
__decorate([
    (0, common_1.Get)('murmurs'),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('users/:id/murmurs'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Get)('me/timeline'),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "timeline", null);
__decorate([
    (0, common_1.Post)('me/murmurs'),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_murmur_dto_1.CreateMurmurDto]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "createForMe", null);
__decorate([
    (0, common_1.Delete)('me/murmurs/:id'),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "deleteForMe", null);
exports.MurmursController = MurmursController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [murmurs_service_1.MurmursService,
        follows_service_1.FollowsService])
], MurmursController);
//# sourceMappingURL=murmurs.controller.js.map