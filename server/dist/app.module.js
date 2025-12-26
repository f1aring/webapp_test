"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const murmur_entity_1 = require("./entities/murmur.entity");
const murmurs_controller_1 = require("./murmurs/murmurs.controller");
const murmurs_service_1 = require("./murmurs/murmurs.service");
const follow_entity_1 = require("./entities/follow.entity");
const like_entity_1 = require("./entities/like.entity");
const follows_controller_1 = require("./follows/follows.controller");
const follows_service_1 = require("./follows/follows.service");
const likes_service_1 = require("./likes/likes.service");
const likes_controller_1 = require("./likes/likes.controller");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'docker',
                password: 'docker',
                database: 'test',
                entities: [user_entity_1.User, murmur_entity_1.Murmur, follow_entity_1.Follow, like_entity_1.Like],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, murmur_entity_1.Murmur, follow_entity_1.Follow, like_entity_1.Like]),
        ],
        controllers: [app_controller_1.AppController, murmurs_controller_1.MurmursController, follows_controller_1.FollowsController, likes_controller_1.LikesController, users_controller_1.UsersController],
        providers: [app_service_1.AppService, murmurs_service_1.MurmursService, follows_service_1.FollowsService, likes_service_1.LikesService, users_service_1.UsersService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map