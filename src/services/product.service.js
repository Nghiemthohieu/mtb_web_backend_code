"use strict";

const { BadRequestError } = require("../core/error.response");
const { populate } = require("../models/category.model");
const productModel = require("../models/product.model");
const { decodeBase64Image } = require("../utils/base64");
const logger = require("../utils/logger");
const omitUndefined = require("../utils/omitUndefinedUtils");
const paginate = require("../utils/paginate");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

class ProductService {
  static CreateProduct = async (data) => {
    if (data.product_variants == null) {
      logger.error("Hãy thêm đây đủ thông tin vào product_variants");
      throw new BadRequestError(
        "Hãy thêm đây đủ thông tin vào product_variants"
      );
    }
    return { data: await productModel.create(data) };
  };

  static GetByProductId = async (id) => {
    return { data: await productModel.findById(id) };
  };

  static GetAllProduct = async (query) => {
    return await paginate(
      productModel,
      {},
      {
        page: query.page,
        limit: query.limit,
        populate: [
          { path: "size", select: "size" },
          { path: "color", select: "color colorImage" },
          { path: "categories", select: "name" },
        ],
        sort: { createdAt: -1 },
      }
    );
  };

  static updateProduct = async (data) => {
    if (!data._id) {
      logger.error("Vui lòng điển _id của size");
      throw new notFoundError("Vui lòng điển _id của size");
    }

    return {
      data: await productModel.findByIdAndUpdate(data._id, data, { new: true }),
    };
  };

  static deleteProduct = async (id) => {
    return { data: await productModel.findByIdAndDelete(id) };
  };

  static getProductByMaterial = async (query) => {
    return {
      data: await productModel
        .findOne({
          _id: query.id,
          product_style: query.styleId,
          "product_images.is_main": true,
        })
        .populate("size", "size")
        .populate("color", "color colorImage")
        .populate("categories", "name"),
    };
  };
  static getProductByColor = async (colorId) => {
    return { data: await productModel.findOne(colorId) };
  };

  static productCollection = async (query) => {
    const {
      page = 1,
      limit = 10,
      size,
      color,
      product_material,
      product_style,
      sort,
    } = query;

    const filter = omitUndefined({
      size,
      color,
      product_material,
      product_style,
    });

    const sortOptions = {
      bestselling: { sold_total: -1 }, // Sắp xếp theo số lượng bán nhiều nhất (giảm dần)
      newest: { createdAt: -1 }, // Sắp xếp theo sản phẩm mới nhất (thời gian tạo giảm dần)
      price_high_to_low: { price: -1 }, // Sắp xếp theo giá từ cao đến thấp
      price_low_to_high: { price: 1 }, // Sắp xếp theo giá từ thấp đến cao
      discount_high_to_low: { discount: -1 }, // Sắp xếp theo phần trăm giảm giá từ cao đến thấp
    };

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sortOptions[sort] || { createdAt: -1 },
    };

    return { data: await paginate(productModel, filter, options) };
  };
}

module.exports = ProductService;
