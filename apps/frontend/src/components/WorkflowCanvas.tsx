import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar';
import FullPropertyDrawer from './FullPropertyDrawer';
import NodeLibrary from './NodeLibrary';
import { CustomNode } from './CustomNode';
import { workflowApi } from '../services/api';
import { Plus, Wand2, History, Star, Maximize, ZoomIn, ZoomOut, Pin, Play } from 'lucide-react';

const WorkflowCanvas = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [workflowName] = useState('My workflow');
  const [showLibrary, setShowLibrary] = useState(false);

  const nodeTypes = useMemo(() => ({
    custom: CustomNode,
  }), []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds)),
    []
  );

  const onNodeClick = useCallback((event: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleAddNode = (type: string, nodeData: any) => {
    // Add offset to prevent overlapping
    const offset = nodes.length * 20;
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'custom',
      data: {
        label: nodeData.label,
        category: nodeData.category,
        icon: typeof nodeData.icon === 'string' ? nodeData.icon : undefined,
        iconColor: nodeData.iconColor,
        parameters: {
          options: []
        }
      },
      position: { x: 400 + offset, y: 300 + offset },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowLibrary(false);
  };

  const isEmpty = nodes.length === 0;

  return (
    <div className="h-screen w-screen bg-midnight-900 flex overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-midnight-800 flex items-center justify-between px-6 bg-midnight-900/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-midnight-400 text-sm">
                <UserIcon size={14} />
                <span>Personal</span>
                <span className="text-midnight-600">/</span>
                <span className="font-bold text-white">{workflowName}</span>
                <span className="ml-2 text-midnight-600 hover:text-midnight-400 cursor-pointer">+ Add tag</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
             {/* Mode Selector */}
             <div className="flex bg-midnight-800 p-1 rounded-lg border border-midnight-700">
                <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-midnight-700 text-white shadow-sm transition-all">Editor</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-md text-midnight-400 hover:text-white transition-all">Executions</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-md text-midnight-400 hover:text-white transition-all">Evaluations</button>
             </div>

             <div className="flex items-center gap-2 ml-4">
                <button className="px-4 py-2 bg-midnight-800 hover:bg-midnight-700 text-white text-xs font-bold rounded-lg border border-midnight-700 transition-all">
                  Publish
                </button>
                <div className="w-px h-6 bg-midnight-800" />
                <History size={18} className="text-midnight-400 cursor-pointer hover:text-white" />
                <button className="flex items-center gap-2 px-4 py-2 bg-midnight-800 hover:bg-midnight-700 text-white text-xs font-bold rounded-lg border border-midnight-700 transition-all">
                   <Star size={14} className="text-yellow-500 fill-current" />
                   Star
                   <span className="ml-1 px-1.5 py-0.5 rounded bg-midnight-900 text-[10px]">186,907</span>
                </button>
             </div>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-midnight-900 overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#1e1e21" variant={BackgroundVariant.Dots} gap={20} size={1} />
          </ReactFlow>

          {/* Empty State Overlay */}
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="flex items-center gap-12 pointer-events-auto">
                  <EmptyStateButton
                    label="Add first step..."
                    onClick={() => setShowLibrary(true)}
                  />
                  <div className="text-midnight-600 font-bold text-sm uppercase tracking-widest">or</div>
                  <EmptyStateButton
                    label="Build with AI"
                    onClick={() => alert('AI Builder coming soon!')}
                    primary
                  />
              </div>
            </div>
          )}

          {/* Bottom Left Toolbar */}
          <div className="absolute bottom-12 left-6 flex gap-2 pointer-events-auto z-10">
              <ToolbarButton><Maximize size={18} /></ToolbarButton>
              <ToolbarButton><ZoomIn size={18} /></ToolbarButton>
              <ToolbarButton><ZoomOut size={18} /></ToolbarButton>
              <ToolbarButton><Pin size={18} /></ToolbarButton>
          </div>

          {/* Bottom Right Execution Bar */}
          <div className="absolute bottom-12 right-6 z-20">
              <button className="flex items-center gap-3 px-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-[0_8px_25px_rgba(239,68,68,0.4)] transition-all active:scale-95 group">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={14} className="fill-current ml-0.5" />
                </div>
                Execute Workflow
              </button>
          </div>

          {/* Logs Panel Handle (Bottom) */}
          <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-midnight-800 bg-midnight-900 flex items-center px-6 justify-between cursor-n-resize hover:bg-midnight-800 transition-colors">
             <span className="text-xs font-bold text-midnight-400">Logs</span>
             <Maximize size={12} className="text-midnight-500" />
          </div>
        </div>

        {selectedNode && (
          <FullPropertyDrawer
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onUpdate={(updatedNode) => {
               setNodes((nds) => nds.map((n) => n.id === updatedNode.id ? updatedNode : n));
               setSelectedNode(updatedNode);
            }}
          />
        )}

          {showLibrary && (
            <NodeLibrary
              onAddNode={handleAddNode}
              onClose={() => setShowLibrary(false)}
            />
          )}
      </main>
    </div>
  );
};

const EmptyStateButton = ({ label, onClick, primary = false }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-4 transition-all hover:scale-105 active:scale-95 group`}
  >
    <div className={`w-24 h-24 rounded-3xl border-2 border-dashed flex items-center justify-center transition-all ${primary ? 'border-indigo-500/50 bg-indigo-500/5 text-indigo-400 group-hover:border-indigo-500 group-hover:bg-indigo-500/10' : 'border-midnight-700 bg-midnight-800/50 text-midnight-400 group-hover:border-midnight-500 group-hover:text-white'}`}>
       {primary ? <Wand2 size={32} /> : <Plus size={32} />}
    </div>
    <span className={`text-sm font-bold ${primary ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-midnight-400 group-hover:text-white'}`}>{label}</span>
  </button>
);

const ToolbarButton = ({ children }: any) => (
  <button className="w-10 h-10 bg-midnight-800 border border-midnight-700 rounded-lg flex items-center justify-center text-midnight-400 hover:bg-midnight-700 hover:text-white transition-all shadow-lg">
    {children}
  </button>
);

const UserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default WorkflowCanvas;
