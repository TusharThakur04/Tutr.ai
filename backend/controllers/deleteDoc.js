import prisma from "../lib/prisma.js";
import s3Client from "../lib/s3Client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const deleteDoc = async (req, res) => {
  const { docId: id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Missing document ID" });
  }

  try {
    const document = await prisma.documents.findUnique({
      where: { id },
    });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const s3Key = document.key;

    const command = new DeleteObjectCommand({
      Bucket: "tutr.ai-obj",
      Key: s3Key,
    });
    const s3Delete = s3Client.send(command);
    const dbDelete = prisma.documents.delete({
      where: { id },
    });

    const [s3Result, dbResult] = await Promise.all([s3Delete, dbDelete]);
    console.log("Deleted from S3 and DB");
    res.status(200).json({ message: "Deleted successfully", dbResult });
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).json({ message: "Deletion failed", error: err.message });
  }
};

export default deleteDoc;
