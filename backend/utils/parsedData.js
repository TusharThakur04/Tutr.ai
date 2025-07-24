import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../lib/s3Client.js";
import PdfParse from "pdf-parse";

//parsing using pdf-parse
const extractTextFromS3 = async (Bucket, Key) => {
  const command = new GetObjectCommand({ Bucket, Key });
  const response = await s3Client.send(command);
  const buffer = await streamToBuffer(response.Body);
  //   console.log(buffer);
  const data = await PdfParse(buffer);
  console.log(data.numpages);
  return data.text;
};

//asw stream to buffer
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    // console.log(chunk, "\n-----------------------------");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export default extractTextFromS3;
