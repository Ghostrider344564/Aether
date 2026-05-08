import { Queue, Worker } from 'bullmq';
import { WorkflowEngine } from '../engine/WorkflowEngine';
import { AppDataSource } from '../data-source';
import { Execution } from '../entities/Execution';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const workflowQueue = new Queue('workflow-executions', { connection });

const engine = new WorkflowEngine();

export const workflowWorker = new Worker('workflow-executions', async job => {
  const { executionId, workflow, initialInput } = job.data;

  const executionRepository = AppDataSource.getRepository(Execution);
  const execution = await executionRepository.findOne({ where: { id: executionId }, relations: ['workflow'] });

  if (!execution) return;

  try {
    const results = await engine.executeWorkflow(workflow, initialInput);
    execution.status = 'success';
    execution.data = results;
    execution.finishedAt = new Date();
    await executionRepository.save(execution);
  } catch (error: any) {
    execution.status = 'error';
    execution.error = error.message;
    execution.finishedAt = new Date();
    await executionRepository.save(execution);
    throw error;
  }
}, { connection });
