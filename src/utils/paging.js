'use strict';

class Paging {
    constructor(page = 1, limit = 10) {
        this.page = parseInt(page) || 1;
        this.limit = parseInt(limit) || 10;
        this.total = 0;
        this.process();
    }
    process() {
        if (this.page <= 0) this.page = 1;
        if (this.limit <= 0 || this.limit > 100) this.limit = 10;
    }

    skip() {
        return (this.page - 1) * this.limit;
    }

    setTotal(total) {
        this.total = total;
    }

    toObject() {
        return {
        page: this.page,
        limit: this.limit,
        total: this.total
        };
    }
}

module.exports = Paging;