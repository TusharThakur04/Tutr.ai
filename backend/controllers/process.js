import prisma from "../lib/prisma.js";
import extractTextFromS3 from "../utils/parsedData.js";
import textCleaning from "../utils/cleaning.js";
import splitting from "../utils/chunking.js";
import embeddingChunks from "../utils/embeddings.js";
import storeEmbeddings from "../utils/storeEmbeddings.js";

const process = async (req, res) => {
  // console.log("----", req.body);
  const { key } = req.body;
  const bucketName = "tutr.ai-obj";

  const rawText = await extractTextFromS3(bucketName, key); //parsed data

  const cleanText = textCleaning(rawText); //clean format
  //   console.log(cleanText);

  const chunks = await splitting(cleanText); // chunking of cleanText

  // embedding generation
  const embeddingsData = [];
  for (const chunk of chunks) {
    const embedding = await embeddingChunks(chunk);
    embeddingsData.push({ chunk, embedding });
  }

  console.log(
    "embedding -----",
    embeddingsData.length,
    "\nlength:",
    embeddingsData[0].embedding.length
  );

  // Store in database
  for (const embedding of embeddingsData) {
    storeEmbeddings(embedding);
  }
  console.log("embeddings added to vector db");

  const updatedStatus = await prisma.documents.update({
    data: { status: "ready" },
    where: { key },
  });

  res.json({ status: updatedStatus.status });
};

export default process;
