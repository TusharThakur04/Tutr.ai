import { pgPool } from "../lib/pool.js";
import answerGeneration from "../utils/answerGeneration.js";
import embeddingChunks from "../utils/embeddings.js";

const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    // generating embeddings for the messages
    const embedding = await embeddingChunks(message);
    const vectorString = JSON.stringify(embedding);

    console.log("retriving context");

    // querying the database for similar chunks
    const result = await pgPool.query(
      `SELECT *, embedding <=> $1 AS similarity
     FROM chunks
     ORDER BY embedding <=> $1
     LIMIT 5`,
      [vectorString]
    );

    const similarChunks = result.rows.map((row) => ({
      ...row,
      similarityScore: 1 - parseFloat(row.similarity),
    }));

    const topScore = similarChunks[0].similarityScore;
    console.log("Top similarity score:", topScore);

    if (topScore >= 0.5) {
      const context = similarChunks.map((chunk) => chunk.content).join("\n\n");
      const answer = await answerGeneration(message, context);
      res.status(200).json({ answer, context });
    } else {
      const context = null;
      const answer = await answerGeneration(message, context);
      res.status(200).json({ answer, context });
    }
  } catch (err) {
    console.error("Error in chatController:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default chatController;
