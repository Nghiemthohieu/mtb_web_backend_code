'use strict';

const { notFoundError } = require("../core/error.response");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const logger = require("../utils/logger");
const redisClient = require("../utils/redis");

class CartService {
    static mergeGuestCartToUser = async (userId, sessionId) => {
        const redisKey = `cart:session:${sessionId}`;
        const redisData = await redisClient.get(redisKey);
        console.log('sessionId', sessionId);
        console.log('redisData', redisData);

        if (!redisData) {
            logger.error('lỗi redisData!!');
            throw new notFoundError('Không tìm thấy giỏ hàng tạm trong Redis');
        }

        const sessionCartItems = JSON.parse(redisData); // Mảng các item giống cartItem[]

        // Tìm giỏ hàng hiện tại của user
        let userCart = await cartModel.findOne({ user: userId });

        if (!userCart) {
            // Nếu chưa có cart thì tạo mới
            userCart = await cartModel.create({
                user: userId,
                cartItem: sessionCartItems
            });
        } else {
            // Merge từng item từ sessionCart vào cartItem[]
            for (const sessionItem of sessionCartItems) {
                const existingItem = userCart.cartItem.find(item =>
                    item.product.toString() === sessionItem.product.toString() &&
                    item.color.toString() === sessionItem.color.toString() &&
                    item.size.toString() === sessionItem.size.toString()
                );

                if (existingItem) {
                    // Nếu tồn tại => cộng số lượng
                    existingItem.quantity += sessionItem.quantity;
                } else {
                    // Nếu chưa có => thêm vào cartItem
                    userCart.cartItem.push(sessionItem);
                }
            }

            await userCart.save(); // Lưu lại thay đổi
        }

        // Xóa Redis sau khi merge xong
        await redisClient.del(redisKey);
    }

    static CreateCart = async (req) => {
        const { product, quantity, color, size } = req.body;
        if (!product || !quantity || !color || !size) {
            throw new notFoundError('Không tìm thấy giỏ hàng tạm trong Redis');
        }

        if (req.user) {
            const existing = await cartModel.findOne({ user: req.user.userId });
            if (existing) {
                const existingItem = existing.cartItem.find(item =>
                    item.product.toString() === product.toString() &&
                    item.color.toString() === color.toString() &&
                    item.size.toString() === size.toString()
                );

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    existing.cartItem.push({ product, quantity, color, size });
                }

                await existing.save();
                return { data: existing };
            } else {
                const newCart = new cartModel({ user: req.user._id, cartItem: [{ product, quantity, color, size }] });
                await newCart.save();
                return { data: newCart };
            }
        } else {
            const redisData = await redisClient.get(req.cartKey);
            let cart = redisData ? JSON.parse(redisData) : [];
            const existingItem = cart.find(item =>
                item.product.toString() === product.toString() &&
                item.color.toString() === color.toString() &&
                item.size.toString() === size.toString()
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ product, quantity, color, size });
            }

            await redisClient.set(req.cartKey, JSON.stringify(cart), 'EX', 7 * 24 * 60 * 60);
            return { data: cart };
        }
    }

    static updateCart = async (req) => {
        const { product, quantity, oldColor, oldSize, newColor, newSize } = req.body;

        if (!product || !quantity || !oldColor || !oldSize || !newColor || !newSize) {
            throw new notFoundError('Thiếu thông tin sản phẩm');
        }

        if (req.user) {
            const existing = await cartModel.findOne({ user: req.user.userId });
            if (!existing) throw new notFoundError('Không tìm thấy giỏ hàng');

            if (oldColor === newColor && oldSize === newSize) {
                // Cập nhật quantity trực tiếp
                const item = existing.cartItem.find(item =>
                    item.product.toString() === product.toString() &&
                    item.color === oldColor &&
                    item.size === oldSize
                );
                if (!item) throw new notFoundError('Không tìm thấy sản phẩm cũ');

                item.quantity = quantity;
            } else {
                const index = existing.cartItem.findIndex(item =>
                    item.product.toString() === product.toString() &&
                    item.color === oldColor &&
                    item.size === oldSize
                );
                if (index === -1) throw new notFoundError('Không tìm thấy sản phẩm cũ');

                existing.cartItem.splice(index, 1);

                const newItem = existing.cartItem.find(item =>
                    item.product.toString() === product.toString() &&
                    item.color === newColor &&
                    item.size === newSize
                );

                if (newItem) {
                    newItem.quantity += quantity;
                } else {
                    existing.cartItem.push({
                        product,
                        color: newColor,
                        size: newSize,
                        quantity
                    });
                }
            }

            await existing.save();
            return { data: existing };

        } else {
            // --- Redis ---
            const redisData = await redisClient.get(req.cartKey);
            let cart = redisData ? JSON.parse(redisData) : [];

            if (oldColor === newColor && oldSize === newSize) {
                const item = cart.find(item =>
                    item.product.toString() === product.toString() &&
                    item.color === oldColor &&
                    item.size === oldSize
                );
                if (!item) throw new notFoundError('Không tìm thấy sản phẩm cũ');

                item.quantity = quantity; // hoặc += quantity tùy logic
            } else {
                const index = cart.findIndex(item =>
                    item.product.toString() === product.toString() &&
                    item.color === oldColor &&
                    item.size === oldSize
                );
                if (index === -1) throw new notFoundError('Không tìm thấy sản phẩm cũ');

                cart.splice(index, 1);

                const newItem = cart.find(item =>
                    item.product.toString() === product.toString() &&
                    item.color === newColor &&
                    item.size === newSize
                );

                if (newItem) {
                    newItem.quantity += quantity;
                } else {
                    cart.push({
                        product,
                        color: newColor,
                        size: newSize,
                        quantity
                    });
                }
            }

            await redisClient.set(req.cartKey, JSON.stringify(cart), 'EX', 7 * 86400);
            return { data: cart };
        }
    };
    static getAllCart = async (req) => {
        console.log('req.user', req.user);
        if (req.user) {
            console.log('req.user.UserId', req.user.userId);
            // 🛒 Lấy giỏ hàng từ DB
            const cart = await cartModel.findOne({ user: req.user.userId }).populate({
                path: 'cartItem.product',
                select: 'name price discountPrice' // chọn các trường cần từ Product
            });
            return { data: cart?.cartItem || [] };
        } else {
            // 🛒 Lấy giỏ hàng từ Redis
            const redisData = await redisClient.get(req.cartKey);
            const cart = redisData ? JSON.parse(redisData) : [];

            // Nếu có sản phẩm thì truy vấn thêm thông tin
            if (cart.length > 0) {
                const productIds = cart.map(item => item.product);

                // Truy vấn thông tin các sản phẩm cần
                const products = await productModel.find({ _id: { $in: productIds } })
                    .select('_id name price discount_price');

                // Gộp dữ liệu vào từng item
                const enrichedCart = cart.map(item => {
                    const productInfo = products.find(p => p._id.toString() === item.product);
                    return {
                        ...item,
                        productInfo: productInfo || null
                    };
                });

                return { data: enrichedCart };
            }

            return { data: cart }; // fallback nếu rỗng
        }
    }

    static deleteCartItem = async (req) => {
        const { product, color, size } = req.body;

        if (!product || !color || !size) {
            throw new notFoundError('Thiếu thông tin sản phẩm để xóa');
        }

        if (req.user) {
            // 🧑‍💼 Đã đăng nhập: Xoá trong DB
            const existing = await cartModel.findOne({ user: req.user.userId });
            if (!existing) {
                throw new notFoundError('Không tìm thấy giỏ hàng');
            }

            const initialLength = existing.cartItem.length;

            existing.cartItem = existing.cartItem.filter(item =>
                item.product.toString() !== product.toString() ||
                item.color.toString() !== color.toString() ||
                item.size.toString() !== size.toString()
            );

            if (existing.cartItem.length === initialLength) {
                throw new notFoundError('Không tìm thấy sản phẩm để xoá');
            }

            await existing.save();
            return { data: existing.cartItem };
        } else {
            // 🧑‍🦱 Guest: Xoá trong Redis
            const redisData = await redisClient.get(req.cartKey);
            let cart = redisData ? JSON.parse(redisData) : [];

            const initialLength = cart.length;

            cart = cart.filter(item =>
                item.product.toString() !== product.toString() ||
                item.color.toString() !== color.toString() ||
                item.size.toString() !== size.toString()
            );

            if (cart.length === initialLength) {
                throw new notFoundError('Không tìm thấy sản phẩm để xoá');
            }

            await redisClient.set(req.cartKey, JSON.stringify(cart), 'EX', 7 * 86400);
            return { data: cart };
        }
    }
}

module.exports = CartService;