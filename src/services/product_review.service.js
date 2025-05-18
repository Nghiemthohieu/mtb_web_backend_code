'use strict';

const { response } = require("express");
const { notFoundError } = require("../core/error.response");
const product_reviewModel = require("../models/product_review.model");
const logger = require("../utils/logger");
const omitUndefined = require("../utils/omitUndefinedUtils");
const { uploadFileToS3 } = require("../utils/uploadFileToS3");
const productModel = require("../models/product.model");

class ProductReviewService {
    static UseProductReview = async (data, files) => {
        const images = files['images'] || [];

        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                return await uploadFileToS3(image.buffer, image.originalname, image.mimetype);
            })
        );
        data.images = uploadedImages;
        return { data: await product_reviewModel.create(data) }
    }
    static ManagerProductReview = async (data, id) => {
        // ❗ Truy vấn lại từ model để đảm bảo là Mongoose document
        const productReview = await product_reviewModel.findById(id);

        if (!productReview) {
            logger.error('Không tìm thấy review');
            throw new notFoundError('Không tìm thấy review');
        }

        // Đảm bảo response là mảng
        if (!Array.isArray(productReview.response)) {
            productReview.response = [];
        }

        // Thêm phản hồi vào response
        if (Array.isArray(data)) {
            productReview.response.push(...data);
        } else {
            productReview.response.push(data);
        }

        // Lưu document
        await productReview.save();

        return { data: productReview };
    };

    static UpdateManagerProductReview = async (data, id) => {
        const productReview = await product_reviewModel.findById(id);
        if (!productReview) {
            logger.error('Không tìm thây review')
            throw new notFoundError('Không tìm thây review')
        }
        for (let i = 0; i < productReview.response.length; i++) {
            if (productReview.response[i]._id == data._id) {
                productReview.response[i] = data
            }
        }
        await productReview.save()
        return { data: productReview }
    }

    static getAllProductReviewsByProductId = async (slug, query) => {
        const {
            page,
            limit,
            sort,
            rating,
            responded,
        } = query;

        // Tìm sản phẩm theo slug
        const product = await productModel.findOne({ slug }).lean();
        if (!product) {
            logger.error('Không tìm thấy review');
            throw new notFoundError('Không tìm thấy review');
        }

        // Điều kiện lọc bổ sung theo các kiểu phản hồi
        const respondedOptions = {
            has_response: { response: { $ne: [] } },
            with_image: { img: { $ne: null } },
        };

        // Tạo filter
        const filter = {
            product: product._id,
            ...(rating && { rating }),
            ...(respondedOptions[responded] || {})
        };

        // Điều kiện sắp xếp
        const sortOptions = {
            descending: { rating: -1 },
            ascending: { rating: 1 },
        };

        // Phân trang
        return await paginate(product_reviewModel, filter, {
            page,
            limit,
            sort: sortOptions[sort] || {}, // fallback nếu sort không hợp lệ
        });
    };

    static GetAllProductReview = async (query) => {
        const {
            page,
            limit,
            sort,
            rating,
            responded,
        } = query

        const respondedOptions = {
            has_response: { response: { $ne: [] } },
            with_image: { img: { $ne: null } },
        }

        const filter = omitUndefined({
            rating,
            ...(respondedOptions[responded] || {})  // Tránh lỗi khi responded không hợp lệ
        })

        const sortOptions = {
            descending: { rating: -1 },
            ascending: { rating: 1 },
        }

        return await paginate(product_reviewModel, filter, {
            page,
            limit,
            sort: sortOptions[sort] || {}, // fallback nếu sort không hợp lệ
        })
    }

    static GetByProductReviewId = async (id) => {
        return { data: await product_reviewModel.findById(id) }
    }

    static updateProductRatings = async () => {
        const stats = await product_reviewModel.aggregate([
            {
                $group: {
                    _id: '$product_id',
                    avg_rating: { $avg: '$rating' },
                    rating_count: { $sum: 1 }
                }
            }
        ]);

        // Duyệt qua kết quả để cập nhật vào bảng Product
        for (const stat of stats) {
            await productModel.findByIdAndUpdate(
                stat._id,
                {
                    avg_rating: stat.avg_rating,
                    rating_count: stat.rating_count
                },
                { new: true }
            );
        }

        console.log('✅ Đã cập nhật rating trung bình và số đánh giá cho tất cả sản phẩm.');
    };

    static DeleteProductReview = async (id) => {
        return { data: await product_reviewModel.findByIdAndDelete(id) }
    }

    static deleteManagerProductReview = async (query) => {
        const { idProductReview, idResponseManager } = query
        const productReview = await product_reviewModel.findById(idProductReview)
        if (!productReview) {
            logger.error('Không tìm thây review')
            throw new notFoundError('Không tìm thây review')
        }
        for (let i = 0; i < productReview.response.length; i++) {
            if (productReview.response[i]._id == idResponseManager) {
                productReview.response.splice(i, 1)
            }
        }
        await productReview.save()
        return { data: productReview }
    }
}

module.exports = ProductReviewService