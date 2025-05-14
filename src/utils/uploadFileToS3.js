'use strict';
// utils/upload_aws.js
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const awsService = require('../dbs/init.awss3');
const {aws: { bucketName, region }} = require('../config/config.awss3');

const uploadFileToS3 = async (fileBuffer, contentType = 'image/jpeg') => {
  const s3 = awsService.getClient();

  if (!bucketName || !region) {
    throw new Error('Bucket name hoặc Region không hợp lệ');
  }

  const fileName = `${uuidv4()}.jpg`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    // ACL: 'public-read', // ❌ KHÔNG dùng ACL nếu bucket đã có policy public
  };

  try {
    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    return fileUrl;
  } catch (err) {
    throw new Error(`Lỗi khi upload lên S3: ${err.message}`);
  }
};

module.exports = {
  uploadFileToS3,
};
