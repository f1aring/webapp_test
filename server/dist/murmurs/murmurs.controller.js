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
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MurmursController = class MurmursController {
    constructor(murmursService, followsService) {
        this.murmursService = murmursService;
        this.followsService = followsService;
    }
    getUserId(req, xUserId) {
        if (req?.user?.id)
            return req.user.id;
        if (xUserId)
            return Number(xUserId);
        return undefined;
    }
    getAll(req, xUserId) {
        const currentUserId = this.getUserId(req, xUserId);
        return this.murmursService.findAll(currentUserId);
    }
    getOne(id, req, xUserId) {
        const currentUserId = this.getUserId(req, xUserId);
        return this.murmursService.findById(id, currentUserId);
    }
    getByUser(id, req, xUserId) {
        const currentUserId = this.getUserId(req, xUserId);
        return this.murmursService.findByUser(Number(id), currentUserId);
    }
    async timeline(req) {
        const userId = req.user.id;
        const following = await this.followsService.getFollowingIds(userId);
        const ids = [userId, ...following];
        return this.murmursService.findByUsers(ids, userId);
    }
    createForMe(req, body) {
        const userId = req.user.id;
        return this.murmursService.createForUser(userId, body);
    }
    deleteForMe(req, id) {
        const userId = req.user.id;
        return this.murmursService.deleteForUser(userId, id);
    }
};
exports.MurmursController = MurmursController;
__decorate([
    (0, common_1.Get)('murmurs'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('murmurs/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('users/:id/murmurs'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)('x-user-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Get)('me/timeline'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MurmursController.prototype, "timeline", null);
__decorate([
    (0, common_1.Post)('me/murmurs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_murmur_dto_1.CreateMurmurDto]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "createForMe", null);
__decorate([
    (0, common_1.Delete)('me/murmurs/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "deleteForMe", null);
exports.MurmursController = MurmursController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [murmurs_service_1.MurmursService,
        follows_service_1.FollowsService])
], MurmursController);
//# sourceMappingURL=murmurs.controller.js.map