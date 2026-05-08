import express from "express";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/AuthRoutes";
import workflowRoutes from "./routes/WorkflowRoutes";
import { handleWebhook } from "./services/WebhookService";
import { workflowWorker } from "./services/QueueService";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/workflows", workflowRoutes);
app.post("/webhook/:workflowId", handleWebhook);

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    // Ensure BullMQ worker is running
    workflowWorker.on('ready', () => console.log("BullMQ Worker is ready"));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
