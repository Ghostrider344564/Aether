import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Workflow } from '../entities/Workflow';
import { authMiddleware } from '../middleware/AuthMiddleware';

const router = Router();

// Get all workflows for the current user
router.get('/', authMiddleware, async (req: any, res) => {
  const workflowRepository = AppDataSource.getRepository(Workflow);
  const workflows = await workflowRepository.find({
    where: { owner: { id: req.user.id } }
  });
  res.json(workflows);
});

// Create a new workflow
router.post('/', authMiddleware, async (req: any, res) => {
  const { name } = req.body;
  const workflowRepository = AppDataSource.getRepository(Workflow);
  const workflow = workflowRepository.create({
    name,
    nodes: [],
    connections: [],
    owner: { id: req.user.id }
  });
  await workflowRepository.save(workflow);
  res.json(workflow);
});

// Update a workflow
router.put('/:id', authMiddleware, async (req: any, res) => {
  const { id } = req.params;
  const { name, nodes, connections, active } = req.body;
  const workflowRepository = AppDataSource.getRepository(Workflow);

  const workflow = await workflowRepository.findOne({
    where: { id, owner: { id: req.user.id } }
  });

  if (!workflow) return res.status(404).json({ error: 'Workflow not found' });

  workflow.name = name ?? workflow.name;
  workflow.nodes = nodes ?? workflow.nodes;
  workflow.connections = connections ?? workflow.connections;
  workflow.active = active ?? workflow.active;

  await workflowRepository.save(workflow);
  res.json(workflow);
});

// Get a single workflow
router.get('/:id', authMiddleware, async (req: any, res) => {
  const { id } = req.params;
  const workflowRepository = AppDataSource.getRepository(Workflow);

  const workflow = await workflowRepository.findOne({
    where: { id, owner: { id: req.user.id } }
  });

  if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
  res.json(workflow);
});

export default router;
