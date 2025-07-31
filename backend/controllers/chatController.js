import { pgPool } from "../lib/pool.js";
import embeddingChunks from "../utils/embeddings.js";

const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    // generating embeddings for the messages
    const embedding = await embeddingChunks(message);
    const vectorString = JSON.stringify(embedding);

    console.log("retriving context");
    const result = await pgPool.query(
      `SELECT *, embedding <=> $1 AS similarity
     FROM chunks
     ORDER BY embedding <=> $1
     LIMIT 5`,
      [vectorString]
    );
    const similarChunks = result.rows;
    const context = similarChunks.map((chunk) => chunk.content).join("\n\n");
    console.log("context:", context);

    console.log(message, embedding);
  } catch (err) {
    console.error("Error in chatController:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default chatController;
