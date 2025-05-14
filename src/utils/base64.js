'use strict';

/**
 * Giải mã một chuỗi base64 (có thể kèm header MIME) thành buffer nhị phân.
 * @param {string} base64String Chuỗi base64 đầu vào (có thể bao gồm 'data:image/jpeg;base64,...')
 * @returns {Buffer} buffer chứa dữ liệu nhị phân
 * @throws Error nếu chuỗi base64 không hợp lệ
 */
function decodeBase64Image(base64String) {
  try {
    // Kiểm tra và loại bỏ prefix MIME nếu có
    const base64Data = base64String.includes('base64,')
      ? base64String.split('base64,')[1]
      : base64String;

    return Buffer.from(base64Data, 'base64');
  } catch (error) {
    throw new Error('Chuỗi base64 không hợp lệ');
  }
}

module.exports = {
  decodeBase64Image,
};