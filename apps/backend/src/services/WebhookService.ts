import { AppDataSource } from "../data-source";
import { Workflow } from "../entities/Workflow";
import { Execution } from "../entities/Execution";
import { workflowQueue } from "./QueueService";
import { Request, Response } from "express";

export const handleWebhook = async (req: Request, res: Response) => {
  const { workflowId } = req.params;
  const workflowRepository = AppDataSource.getRepository(Workflow);
  const executionRepository = AppDataSource.getRepository(Execution);

  const workflow = await workflowRepository.findOne({ where: { id: workflowId } });
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }

  const execution = executionRepository.create({
    workflow,
    status: "running",
    startedAt: new Date(),
  });
  await executionRepository.save(execution);

  await workflowQueue.add('execute', {
    executionId: execution.id,
    workflow: { nodes: workflow.nodes, connections: workflow.connections },
    initialInput: { body: req.body, query: req.query, headers: req.headers },
  });

  res.json({ executionId: execution.id, message: "Workflow started" });
};
