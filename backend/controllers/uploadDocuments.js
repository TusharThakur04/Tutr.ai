import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const uploadDocument = async (req, res) => {
  console.log("uploading");
  const { fileName, type, userId } = req.body;
  const key = `users/${userId}/${Date.now()}_${fileName}`;

  const command = new PutObjectCommand({
    Bucket: "tutr.ai-obj",
    Key: key,
    ContentType: type,
    ACL: "private",
    Tagging: "Project=Tutr.ai&Category=Document",
  });
  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  console.log(uploadURL);
  res.json({ uploadURL, key });
};

export default uploadDocument;
