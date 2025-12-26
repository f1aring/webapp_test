import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<import("../entities/user.entity").User[]>;
    getOne(id: string): Promise<any>;
}
