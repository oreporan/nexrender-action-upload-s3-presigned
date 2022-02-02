const path = require("path");
const uploadToS3 = require("./uploadToS3");

const run = async (job, settings, action, type) => {
  if (type != "postrender") {
    throw new Error(
      `[nexrender-action-upload-s3-presigned] action can be only run in postrender mode, you provided: ${type}.`
    );
  }
  const {
    input,
    params: { url, contentType },
  } = action;
  input = input ?? job.output;
  if (!path.isAbsolute(input)) input = path.join(job.workpath, input);

  await uploadToS3(url, input, contentType);
};

module.exports = run;
