import React from 'react';
import { Plus, Box, Terminal, Repeat, HelpCircle, Activity } from 'lucide-react';

const NODE_TYPES = [
  { type: 'start', label: 'Start', icon: Activity, description: 'Workflow entry point' },
  { type: 'httpRequest', label: 'HTTP Request', icon: Box, description: 'Make API calls' },
  { type: 'if', label: 'If', icon: HelpCircle, description: 'Branch the workflow' },
  { type: 'set', label: 'Set', icon: Repeat, description: 'Set variables' },
  { type: 'code', label: 'Code', icon: Terminal, description: 'Custom JS logic' },
  { type: 'wait', label: 'Wait', icon: Plus, description: 'Delay execution' },
];

interface NodeLibraryProps {
  onAddNode: (type: string) => void;
  onClose: () => void;
}

const NodeLibrary: React.FC<NodeLibraryProps> = ({ onAddNode, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[600px] rounded-lg border border-midnight-700 bg-midnight-800 p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Add Node</h2>
          <button onClick={onClose} className="text-midnight-400 hover:text-white">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {NODE_TYPES.map((node) => (
            <button
              key={node.type}
              onClick={() => {
                onAddNode(node.type);
                onClose();
              }}
              className="flex items-start gap-4 rounded-lg border border-midnight-700 bg-midnight-900 p-4 text-left transition-colors hover:border-blue-600 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded bg-midnight-800 group-hover:bg-blue-600/20 group-hover:text-blue-500">
                <node.icon size={20} />
              </div>
              <div>
                <div className="font-semibold text-white">{node.label}</div>
                <div className="text-sm text-midnight-400">{node.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NodeLibrary;
