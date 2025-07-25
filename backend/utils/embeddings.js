import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HUGGING_FACE_ACCESS_TOKEN);

const embeddingChunks = async (chunk) => {
  const embeddingData = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: chunk,
  });

  console.log(embeddingData);

  return embeddingData;
};

export default embeddingChunks;
