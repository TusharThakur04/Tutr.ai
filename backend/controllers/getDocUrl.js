import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
const getDocUrl = async (req, res) => {
  const { key } = req.body;

  const command = new GetObjectCommand({
    Bucket: "tutr.ai-obj",
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    console.log("fetched url for viewing doc");
    res.status(200).json({ signedUrl });
  } catch (err) {
    console.log("Error creating signed URL", err);
    res.status(500).json({ error: "Error creating signed URL" });
  }
};

export default getDocUrl;
