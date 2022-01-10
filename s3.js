require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME || "intelligent.forum";
const region = process.env.AWS_BUCKET_REGION || "eu-central-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "AKIAWQIWFG2P4TXRKDGF";
const secretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY ||
  "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
async function uploadFile(file, fileName, filePath) {
  await file.mv(filePath);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
