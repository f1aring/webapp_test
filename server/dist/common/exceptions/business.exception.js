"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = exports.ForbiddenException = exports.UnauthorizedException = exports.ResourceNotFoundException = exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    constructor(message, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        super(message, statusCode);
    }
}
exports.BusinessException = BusinessException;
class ResourceNotFoundException extends BusinessException {
    constructor(resource) {
        super(`${resource} not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
class UnauthorizedException extends BusinessException {
    constructor(message = 'Unauthorized') {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends BusinessException {
    constructor(message = 'Forbidden') {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends BusinessException {
    constructor(message) {
        super(message, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=business.exception.js.map