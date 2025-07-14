import prisma from "../lib/prisma.js";

const getDocMetadata = async (req, res) => {
  const { userId: clerkId } = req.query;
  //   console.log("clerkid", clerkId);
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    const userId = user.id;

    const docs = await prisma.documents.findMany({ where: { userId } });

    console.log("metadata fetched");
    res.json(docs);
  } catch (err) {
    console.log("docs metadata not fetched", err);
  }
};

export default getDocMetadata;
