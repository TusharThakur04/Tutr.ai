import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../lib/s3Client.js";

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
  console.log("fetched url for uploading");
  res.json({ uploadURL, key });
};

export default uploadDocument;
