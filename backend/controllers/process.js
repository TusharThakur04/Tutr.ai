import prisma from "../lib/prisma.js";
import extractTextFromS3 from "../utils/parsedData.js";
import textCleaning from "../utils/cleaning.js";
import splitting from "../utils/chunking.js";
import embeddingChunks from "../utils/embeddings.js";
// import embeddingChunks from "../utils/embeddings.js";

const process = async (req, res) => {
  // console.log("----", req.body);
  const { key } = req.body;
  const bucketName = "tutr.ai-obj";

  const rawText = await extractTextFromS3(bucketName, key); //parsed data

  const cleanText = textCleaning(rawText); //clean format
  //   console.log(cleanText);

  const chunks = await splitting(cleanText); // chunking of cleanText

  const embeddingsData = [];
  for (const chunk of chunks) {
    const embedding = await embeddingChunks(chunk);
    embeddingsData.push(embedding);
  }

  console.log(
    "embedding -----",
    embeddingsData.length,
    "\n",
    embeddingsData[0]
  );

  res.json("");
};

export default process;
