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
exports.FollowsController = void 0;
const common_1 = require("@nestjs/common");
const follows_service_1 = require("./follows.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FollowsController = class FollowsController {
    constructor(followsService) {
        this.followsService = followsService;
    }
    checkFollow(req, id) {
        const userId = req.user.id;
        return this.followsService.isFollowing(userId, Number(id));
    }
    follow(req, id) {
        const userId = req.user.id;
        return this.followsService.follow(userId, Number(id));
    }
    unfollow(req, id) {
        const userId = req.user.id;
        return this.followsService.unfollow(userId, Number(id));
    }
};
exports.FollowsController = FollowsController;
__decorate([
    (0, common_1.Get)('me/follow/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FollowsController.prototype, "checkFollow", null);
__decorate([
    (0, common_1.Post)('me/follow/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FollowsController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)('me/follow/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FollowsController.prototype, "unfollow", null);
exports.FollowsController = FollowsController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [follows_service_1.FollowsService])
], FollowsController);
//# sourceMappingURL=follows.controller.js.map