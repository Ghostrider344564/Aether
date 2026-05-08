import React from 'react';
import { Settings, Play, Save, ChevronRight } from 'lucide-react';

interface PropertyPanelProps {
  selectedNode: any;
  onUpdate: (params: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedNode, onUpdate }) => {
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-midnight-700 bg-midnight-800 p-4">
        <p className="text-midnight-400">Select a node to edit properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-midnight-700 bg-midnight-800 p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">{selectedNode.data.label}</h3>
        <Settings size={18} className="text-midnight-400" />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-midnight-400 uppercase mb-1">Node Name</label>
          <input
            type="text"
            className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            defaultValue={selectedNode.data.label}
          />
        </div>

        {/* Dynamic parameters based on node type would go here */}
        <div>
          <label className="block text-xs font-medium text-midnight-400 uppercase mb-1">URL</label>
          <input
            type="text"
            placeholder="https://api.example.com"
            className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded flex items-center justify-center gap-2 transition-colors">
          <Play size={16} /> Execute Node
        </button>
      </div>
    </div>
  );
};

export default PropertyPanel;
