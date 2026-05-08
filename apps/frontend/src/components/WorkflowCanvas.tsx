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

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 50 } },
];

const initialEdges: Edge[] = [];

const WorkflowCanvas = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [darkMode, setDarkMode] = useState(true);

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

  return (
    <div className={`h-screen w-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-full flex-col bg-white dark:bg-midnight-900 text-midnight-900 dark:text-white">
        <header className="flex h-12 items-center justify-between border-b border-midnight-200 dark:border-midnight-700 px-4">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center font-bold text-xs text-white">A</div>
             <span className="font-bold">Aether</span>
          </div>
          <div className="flex gap-4">
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
          <PropertyPanel selectedNode={selectedNode} onUpdate={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
