import axios from "axios";

const storeUser = async (user) => {
  try {
    const userPayload = {
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "",
      username: user.firstName,
      image: user.imageUrl,
    };

    console.log("Mirroring user:", userPayload);

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, userPayload);
  } catch (error) {
    console.error("Failed to mirror user:", error);
  }
};

export default storeUser;
