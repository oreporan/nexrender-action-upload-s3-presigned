const fs = require("fs");
const axios = require("axios");

const putToPresignedUrl = async (url, buffer, contentTypeArg) => {
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
    throw error;
  }
};

const uploadToS3 = async (url, filePath, contentType) => {
  const buffer = fs.readFileSync(filePath);
  await putToPresignedUrl(url, buffer, contentType);
};

module.exports = uploadToS3;
