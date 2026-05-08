import express from "express";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/AuthRoutes";
import { handleWebhook } from "./services/WebhookService";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.post("/webhook/:workflowId", handleWebhook);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
