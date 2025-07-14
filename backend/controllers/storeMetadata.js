import prisma from "../lib/prisma.js";

const storeMetadata = async (req, res) => {
  const { name, key, userId: clerkId, type, status } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const document = await prisma.documents.create({
      data: {
        name,
        key,
        type,
        status,
        userId: user.id,
      },
    });
    console.log("stored metadata", document);

    res.status(201).json(document);
  } catch (err) {
    console.error("Error storing metadata:", err);
    res.status(500).json({ error: "Failed to store metadata" });
  }
};

export default storeMetadata;
