const fs = require("fs");
const axios = require("axios");

const putToPresignedUrl = async (url, buffer, contentTypeArg, logger) => {
  try {
    const params = new URL(url);
    const contentType = params.searchParams.get("Content-Type");
    if (!contentTypeArg && !contentType) {
      throw new Error(`invalid presigned url, missing content-type`);
    }
    await axios.put(url, buffer, {
      headers: { "Content-Type": contentType ?? contentTypeArg },
    });
  } catch (error) {
    logger.log(
      `[nexrender-action-upload-s3-presigned] could not upload to s3 presigned url: ${url}, error: ${error.message}`
    );
    throw error;
  }
};

const uploadToS3 = async (url, filePath, contentType, logger) => {
  const buffer = fs.readFileSync(filePath);
  await putToPresignedUrl(url, buffer, contentType, logger);
};

module.exports = uploadToS3;
