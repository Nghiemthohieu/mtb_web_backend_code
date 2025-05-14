'use strict';

const Paging = require('./paging');

/**
 * Hàm phân trang tái sử dụng cho bất kỳ model Mongoose nào
 * @param {Object} model - Mongoose model
 * @param {Object} query - điều kiện lọc
 * @param {Object} options - { page, limit, sort, populate }
 */
const paginate = async (model, query = {}, options = {}) => {
  const { page = 1, limit = 10, sort = null, populate = '' } = options;
  const paging = new Paging(page, limit);

  const total = await model.countDocuments(query);
  paging.setTotal(total);

  let dbQuery = model.find(query).skip(paging.skip()).limit(paging.limit);

  if (sort) dbQuery = dbQuery.sort(sort);
  if (populate) dbQuery = dbQuery.populate(populate);

  const data = await dbQuery;

  return {
    data,
    paging: paging.toObject()
  };
};

module.exports = paginate;
