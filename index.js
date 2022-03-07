const path = require("path");
const uploadToS3 = require("./uploadToS3");

const run = async (job, settings, action, type) => {
  if (type != "postrender") {
    throw new Error(
      `[nexrender-action-upload-s3-presigned] action can be only run in postrender mode, you provided: ${type}.`
    );
  }
  const logger = settings;
  const {
    input,
    params: { url, contentType },
  } = action;
  try {
    let finalInput = input ?? job.output;
    if (!path.isAbsolute(finalInput))
      finalInput = path.join(job.workpath, finalInput);

    logger.log(
      `[nexrender-action-upload-s3-presigned] uploading to presigned-url: ${url}`
    );

    await uploadToS3(url, finalInput, contentType, logger);
  } catch (error) {
    logger.log(
      `[nexrender-action-upload-s3-presigned] failed uploading to presigned-url: ${url} \n ${error?.message}`
    );
    throw error;
  }
};

module.exports = run;
