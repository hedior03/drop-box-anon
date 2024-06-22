import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import environmentVars from "../environmentVars";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
  region: "auto",
  endpoint: environmentVars.R2_BUCKET_URL,
  credentials: {
    accessKeyId: environmentVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: environmentVars.AWS_SECRET_ACCESS_KEY,
  },
});

export const getPutUrl = async (key: string, expiresIn = 3600) => {
  return await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "drop-box-bucket-tdv3eq8vzck2dw",
      Key: key,
    }),
    { expiresIn }
  );
};
