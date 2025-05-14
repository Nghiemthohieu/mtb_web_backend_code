'use strict';

const STATUS_CODE = {
    OK: 200,
    CREATE: 201
};

const REASON_STATUS_CODE = {
    OK: 'Success',
    CREATE: 'Create success' 
};

class SuccessResponse {
    constructor({message, statusCode = STATUS_CODE.OK, reasonStatusCode = REASON_STATUS_CODE.OK, data = {}}) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.data = data;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({message, data}) {
        super({message, data});
    }
}

class CREATE extends SuccessResponse {
    constructor({options = {},message,statusCode = STATUS_CODE.CREATE, reasonStatusCode = REASON_STATUS_CODE.CREATE ,data}) {
        super({message,statusCode, reasonStatusCode ,data});
        this.options = options
    }
}

module.exports = {
    OK,
    CREATE,
    SuccessResponse
}