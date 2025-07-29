import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import login from "./routes/login.js";
import upload from "./routes/upload.js";
import getDoc from "./routes/getDoc.js";
import metaData from "./routes/metaData.js";
import prepare from "./routes/prepare.js";
import chat from "./routes/chat.js";
const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", login);
app.use("/upload", upload);
app.use("/getDoc", getDoc);
app.use("/metadata", metaData);
app.use("/prepare", prepare);
app.use("/chat", chat);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
