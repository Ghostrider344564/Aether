import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  OnConnect
} from 'reactflow';
import 'reactflow/dist/style.css';
import PropertyPanel from './PropertyPanel.tsx';
import NodeLibrary from './NodeLibrary';
import { workflowApi } from '../services/api';

const initialNodes: Node[] = [
  { id: '1', type: 'start', data: { label: 'Start' }, position: { x: 250, y: 50 } },
];

const initialEdges: Edge[] = [];

const WorkflowCanvas = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showLibrary, setShowLibrary] = useState(false);
  const [workflowId, setWorkflowId] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSave = async () => {
    try {
      if (!workflowId) {
        const res = await workflowApi.create('My New Workflow');
        setWorkflowId(res.data.id);
        await workflowApi.save(res.data.id, { nodes, connections: edges });
      } else {
        await workflowApi.save(workflowId, { nodes, connections: edges });
      }
      alert('Workflow saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save workflow. Ensure backend is running and you are logged in.');
    }
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: { label: type.charAt(0).toUpperCase() + type.slice(1), parameters: {} },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className={`h-screen w-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-full flex-col bg-white dark:bg-midnight-900 text-midnight-900 dark:text-white">
        <header className="flex h-12 items-center justify-between border-b border-midnight-200 dark:border-midnight-700 px-4">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-xs text-white">A</div>
             <span className="font-bold">Aether</span>
          </div>
          <div className="flex gap-4 items-center">
             <button onClick={handleSave} className="bg-green-600 px-3 py-1 rounded text-xs text-white font-bold">Save</button>
             <button onClick={() => setShowLibrary(true)} className="bg-blue-600 px-3 py-1 rounded text-xs text-white font-bold">+ Add Node</button>
             <button className="text-sm text-midnight-400 hover:text-white">Executions</button>
             <button className="text-sm text-midnight-400 hover:text-white">Credentials</button>
             <button
               onClick={() => setDarkMode(!darkMode)}
               className="rounded-md bg-midnight-200 dark:bg-midnight-800 px-3 py-1 text-xs"
             >
               {darkMode ? 'Light' : 'Dark'}
             </button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              fitView
            >
              <Background color={darkMode ? "#27272a" : "#ddd"} gap={20} />
              <Controls />
            </ReactFlow>
          </div>
          <PropertyPanel
            selectedNode={selectedNode}
            onUpdate={(updatedNode) => {
               setNodes((nds) => nds.map((n) => n.id === updatedNode.id ? updatedNode : n));
               setSelectedNode(updatedNode);
            }}
          />
        </div>
        {showLibrary && <NodeLibrary onAddNode={addNode} onClose={() => setShowLibrary(false)} />}
      </div>
    </div>
  );
};

export default WorkflowCanvas;
