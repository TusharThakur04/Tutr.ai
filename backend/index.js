import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import login from "./routes/login.js";

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
