import S3 from "aws-sdk/clients/s3";
import { ACCESS_KEY, SECRET_KEY } from "./Keys";

var s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: "ap-southeast-1",
});

export const listObjectsV2 = (params) => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export const upload = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
