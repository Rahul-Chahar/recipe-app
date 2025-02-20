const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.uploadFile = (fileContent, fileName, mimeType) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: fileContent,
    ContentType: mimeType,
    ACL: "public-read"
  };

  return s3.upload(params).promise();
};
