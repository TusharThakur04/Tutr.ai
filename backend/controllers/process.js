import { GetObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../lib/prisma.js";
import s3Client from "../lib/s3Client.js";
import pdfParse from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const process = async (req, res) => {
  console.log("----", req.body);
  const { key } = req.body;
  const bucketName = "tutr.ai-obj";
  const rawText = await extractTextFromS3(bucketName, key);
  const cleanText = textCleaning(rawText);
  //   console.log(cleanText);
  const chunks = await splitting(cleanText);

  res.json("hi");
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

//parsing using pdf-parse
const extractTextFromS3 = async (Bucket, Key) => {
  const command = new GetObjectCommand({ Bucket, Key });
  const response = await s3Client.send(command);
  const buffer = await streamToBuffer(response.Body);
  //   console.log(buffer);
  const data = await pdfParse(buffer);
  console.log(data.numpages);
  return data.text;
};

//cleaning
const textCleaning = (rawText) => {
  const cleanText = rawText
    // Normalize newlines → space
    .replace(/\r?\n|\r/g, " ")
    // Remove multiple spaces
    .replace(/\u00a0/g, " ")
    // Remove page numbers
    .replace(/Page\s?\d+/gi, "")
    // Remove figure references
    .replace(/FIGURE\s?P?\d+[A-Z]?\s*/gi, "")
    // Remove headers like cen58933_ch15.qxd...
    .replace(/cen\d+_ch\d+\.qxd.*?(AM|PM)/gi, "")
    // Remove large OCR junk numbers
    .replace(/\b\d{5,}\b/g, "")
    // Remove hyphen breaks
    .replace(/-\s+/g, "")
    // Collapse extra spaces
    .replace(/\s{2,}/g, " ")
    // Add space between number and letter
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    // Split stuck words with capital letters
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // Fix units like 20cm → 20 cm
    .replace(/([0-9]+)([A-Za-z]+)/g, "$1 $2")
    // Fix multiple commas
    .replace(/,+/g, ",")
    // Add space before degree symbol if missing
    .replace(/(?<!\d)°/g, " °")
    // Remove unwanted special characters but keep essential ones
    .replace(/[^\w\s.,°°C:/-]/g, "")
    .trim();
  return cleanText;
};

//chunking
const splitting = async (longText) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // ~1000 characters per chunk
    chunkOverlap: 200, // overlap for context
  });

  const chunks = await splitter.splitText(longText);
  console.log("Chunks:", chunks.length);
  return chunks;
};

export default process;
