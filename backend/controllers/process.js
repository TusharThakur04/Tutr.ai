import { GetObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../lib/prisma.js";
import s3Client from "../lib/s3Client.js";
import pdfParse from "pdf-parse";

const process = async (req, res) => {
  console.log("----", req.body);
  const { key } = req.body;
  const bucketName = "tutr.ai-obj";
  const text = await extractTextFromS3(bucketName, key);
  res.json("hi");
};

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    // console.log(chunk, "n ----------");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

const extractTextFromS3 = async (Bucket, Key) => {
  const command = new GetObjectCommand({ Bucket, Key });
  const response = await s3Client.send(command);
  const buffer = await streamToBuffer(response.Body);
  console.log("pdf text ---", buffer, "------end");
  const data = await pdfParse(buffer);
  console.log(data);
  return data.text;
};

export default process;
