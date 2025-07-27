import { pgPool } from "../lib/pool.js";

const storeEmbeddings = async ({ embedding, chunk }) => {
  try {
    const vectorString = `[${embedding.join(",")}]`;
    await pgPool.query(
      "INSERT INTO chunks (embedding, content) VALUES ($1::vector, $2)",
      [vectorString, chunk]
    );
  } catch (err) {
    console.log(err);
  }
};

export default storeEmbeddings;
