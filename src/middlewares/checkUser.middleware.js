'use strict';

const checkUserId = async (req, res, next) => {
    if (req.user) {
        req.cartKey = `cart:user:${req.user.id}`;
    } else {
        if (!req.cookies.guest_id) {
            const guestID = uuidv4();
            res.cookie('guest_id', guestID, { maxAge: 7 * 86400000, httpOnly: true });
            req.guestID = guestID;
        } else {
            req.guestID = req.cookies.guest_id;
        }
        req.cartKey = `cart:guest:${req.guestID}`;
    }
    next();
};