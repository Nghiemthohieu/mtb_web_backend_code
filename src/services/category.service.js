'use strict';

const { default: mongoose } = require("mongoose");
const { notFoundError } = require("../core/error.response");
const categoryModel = require("../models/category.model");
const { decodeBase64Image } = require("../utils/base64");
const logger = require("../utils/logger");
const paginate = require("../utils/paginate");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");

class CategoryService {
    static CreateCategory = async(data) => {
        if(data.img) {
            let image = decodeBase64Image(data.img);
            data.img = await uploadFileToS3(image);
        }
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
        if(data.img) {
            let image = decodeBase64Image(data.img);
            data.img = await uploadFileToS3(image);
        }    
        return {data: await categoryModel.findByIdAndUpdate(data._id, data, {new: true})};
    }

    static DeleteCategory = async(id) => {
        return {data: await categoryModel.findByIdAndDelete(id)};
    }

    static GetHomeCategory = async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid category id');
        }

        const result = await categoryModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) }
            },
            {
                $graphLookup: {
                    from: 'db_categories',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parent_id',
                    as: 'allChildren'
                }
            },
            {
                $project: {
                    allChildren: {
                        $filter: {
                            input: '$allChildren',
                            as: 'item',
                            cond: { $eq: ['$$item.is_featured', true] }
                        }
                    }
                }
            }
        ]);

        return { data: result[0]?.allChildren || [] };
    };

    static GetNavbarCategory = async () => {
        const roots = await categoryModel.aggregate([
            {
            $match: {
                is_navbar: true,
                parent_id: null
            }
            },
            {
            $graphLookup: {
                from: 'db_categories',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parent_id',
                as: 'allChildren'
            }
            }
        ]);

        // Lồng children thành dạng cây
        return roots.map(root => this.buildTree(root));
    }
    static buildTree(root) {
        const nodes = [root, ...root.allChildren];

        // Tạo map để dễ truy cập node theo _id
        const nodeMap = new Map();
        nodes.forEach(node => {
            node.children = []; // Khởi tạo
            nodeMap.set(node._id.toString(), node);
        });

        let treeRoot = null;

        nodes.forEach(node => {
            if (node.parent_id) {
            const parent = nodeMap.get(node.parent_id.toString());
            if (parent) {
                parent.children.push(node);
            }
            } else {
            treeRoot = node; // gốc không có parent_id
            }
        });

        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
                node.children.sort((a, b) => a.sort_order - b.sort_order);
            }
        });

        delete treeRoot.allChildren;

        return treeRoot;
    }
}

module.exports = CategoryService