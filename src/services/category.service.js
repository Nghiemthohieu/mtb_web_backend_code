'use struct';

const { notFoundError } = require("../core/error.response");
const categoryModel = require("../models/category.model");
const logger = require("../utils/logger");

class CategoryService {
    static CreateCategory = async(data) => {
        return {data: await categoryModel.create(data)};
    }

    static GetByCategoryId = async(id) => {
        return {data: await categoryModel.findById(id)};
    }

    static GetAllCategory = async(query) => {
        return await paginate(categoryModel, {}, {page: query.page, limit: query.limit});
    }

    static UpdateCategory = async(data) => {
        if (!data._id) {
            logger.error('Vui lòng điển _id của category');
            throw new notFoundError('Vui lòng điển _id của category');
        }
        return {data: await categoryModel.findByIdAndUpdate(data._id, data, {new: true})};
    }

    static DeleteCategory = async(id) => {
        return {data: await categoryModel.findByIdAndDelete(id)};
    }

    static GetHomeCategory = async(id) => {
        return {data: await categoryModel.find({is_featured: true, parent_id: id})};
    }

    static GetNavbarCategory = async(id) => {
        return {data: await categoryModel.find({is_navbar: true, parent_id: null})};
    }
}

module.exports = CategoryService