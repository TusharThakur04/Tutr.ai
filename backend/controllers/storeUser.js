import prisma from "../lib/prisma.js";

const storeUser = async (req, res) => {
  try {
    const { clerkId, email, username, image } = req.body;

    if (!clerkId || !email) {
      console.log("missing email and clerkid");
      return res.status(400).json({ error: "Missing required fields" });
    }

    //mirror user to DB
    let user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          username,
          image,
        },
      });
      console.log("user stored:", user.username);
      return res.status(200).json({ message: "User stored", user });
    } else {
      console.log("user exists:", user.username);
      return res.status(200);
    }
    // Now `user` is always defined
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default storeUser;
