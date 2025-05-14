'use strict';

const { S3Client } = require("@aws-sdk/client-s3");
const { aws: { accessKeyId, secretAccessKey, region } } = require('../config/config.awss3');
const logger = require("../utils/logger");

class AwsService {
  constructor() {
    this.s3Client = null;
  }

  init(config) {

    if (!accessKeyId || !secretAccessKey || !region) {
      logger.error('AWS AccessKeyID, SecretAccessKey hoặc Region không hợp lệ')
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    logger.info('AWS S3 Client khởi tạoc thành công');
  }

  getClient() {
    if (!this.s3Client) {
      logger.error('AWS S3 Client chưa khởi tạo');
    }
    return this.s3Client;
  }
}

// Singleton instance
const awsService = new AwsService();
module.exports = awsService;
