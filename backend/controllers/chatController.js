import embeddingChunks from "../utils/embeddings.js";

const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    const embedding = await embeddingChunks(message);
    console.log(message, embedding);
  } catch (err) {}
};

export default chatController;
