'use strict';

const { SuccessResponse } = require("../core/success.reponse");
const CategoryService = require("../services/category.service");

class CategoryController {
    static CreateCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Create Category success',
            data: await CategoryService.CreateCategory(req.body)
        }).send(res);
    };

    static GetByCategoryId = async(req, res) => {
        return new SuccessResponse({
            message: 'Get Category success',
            data: await CategoryService.GetByCategoryId(req.params.id)
        }).send(res);
    };

    static GetAllCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Get All Category success',
            data: await CategoryService.GetAllCategory(req.query)
        }).send(res);
    };

    static UpdateCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Update Category success',
            data: await CategoryService.UpdateCategory(req.body)
        }).send(res);
    };

    static DeleteCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Delete Category success',
            data: await CategoryService.DeleteCategory(req.params.id)
        }).send(res);
    };

    static GetHomeCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Get Home Category success',
            data: await CategoryService.GetHomeCategory(req.params.id)
        }).send(res);
    };

    static GetNavbarCategory = async(req, res) => {
        return new SuccessResponse({
            message: 'Get All Category success',
            data: await CategoryService.GetNavbarCategory()
        }).send(res);
    };
}

module.exports = CategoryController;