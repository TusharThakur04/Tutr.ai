import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//chunking
const splitting = async (longText) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // ~1000 characters per chunk
    chunkOverlap: 200, // overlap
  });

  const chunks = await splitter.splitText(longText);

  if (chunks.length !== 0) {
    console.log(" Data chunked \n chunks:", chunks.length);
  }
  return chunks;
};

export default splitting;
