import { HttpException, HttpStatus } from '@nestjs/common';
export declare class BusinessException extends HttpException {
    constructor(message: string, statusCode?: HttpStatus);
}
export declare class ResourceNotFoundException extends BusinessException {
    constructor(resource: string);
}
export declare class UnauthorizedException extends BusinessException {
    constructor(message?: string);
}
export declare class ForbiddenException extends BusinessException {
    constructor(message?: string);
}
export declare class ConflictException extends BusinessException {
    constructor(message: string);
}
