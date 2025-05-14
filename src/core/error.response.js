'use strict';

const STATUS_CODE = {
    FORBIDDEN: 403,
    CONFLICT: 409
};

const REASON_STATUS_CODE = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict request error'
};

const {ReasonPhrases,StatusCodes} = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = REASON_STATUS_CODE.CONFLICT, status = STATUS_CODE.CONFLICT) {
        super(message, status);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = REASON_STATUS_CODE.FORBIDDEN, status = STATUS_CODE.FORBIDDEN) {
        super(message, status);
    }
}

class authFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
        super(message, status);
    }
}

class notFoundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
        super(message, status);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
        super(message, status);
    }
}

class DuplicateError extends ErrorResponse {
    constructor(message = ReasonPhrases.CREATED, status = StatusCodes.CREATED) {
        super(message, status);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    authFailureError,
    notFoundError,
    ForbiddenError,
    DuplicateError
};
