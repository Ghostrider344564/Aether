import React from 'react';
import { Settings, Play, Save } from 'lucide-react';

interface PropertyPanelProps {
  selectedNode: any;
  onUpdate: (updatedNode: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedNode, onUpdate }) => {
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-midnight-700 bg-midnight-800 p-4">
        <p className="text-midnight-400 text-sm">Select a node to edit properties</p>
      </div>
    );
  }

  const handleParamChange = (key: string, value: any) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        parameters: {
          ...selectedNode.data.parameters,
          [key]: value
        }
      }
    };
    onUpdate(updatedNode);
  };

  const handleSave = () => {
     // Trigger save in parent component or via API directly if we had the workflow ID
     alert('Workflow structure saved to local state. Click Save in the header for persistence (if implemented).');
  };

  return (
    <div className="w-80 border-l border-midnight-700 bg-midnight-800 p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-white">{selectedNode.data.label}</h3>
        <Settings size={18} className="text-midnight-400" />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">Node Name</label>
          <input
            type="text"
            className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            value={selectedNode.data.label}
            onChange={(e) => onUpdate({ ...selectedNode, data: { ...selectedNode.data, label: e.target.value } })}
          />
        </div>

        {selectedNode.type === 'httpRequest' && (
          <>
            <div>
              <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">Method</label>
              <select
                className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                value={selectedNode.data.parameters.method || 'GET'}
                onChange={(e) => handleParamChange('method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">URL</label>
              <input
                type="text"
                className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="https://api.example.com"
                value={selectedNode.data.parameters.url || ''}
                onChange={(e) => handleParamChange('url', e.target.value)}
              />
            </div>
          </>
        )}

        {selectedNode.type === 'code' && (
          <div>
            <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">JavaScript Code</label>
            <textarea
              className="w-full h-48 bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm font-mono text-blue-400 focus:outline-none focus:border-blue-500"
              value={selectedNode.data.parameters.jsCode || 'return item;'}
              onChange={(e) => handleParamChange('jsCode', e.target.value)}
            />
          </div>
        )}

        {selectedNode.type === 'wait' && (
          <div>
            <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">Wait Duration (Seconds)</label>
            <input
              type="number"
              className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              value={selectedNode.data.parameters.seconds || 5}
              onChange={(e) => handleParamChange('seconds', parseInt(e.target.value))}
            />
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 space-y-2">
        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors"
        >
          <Save size={16} /> Save Node
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors">
          <Play size={16} /> Test Node
        </button>
      </div>
    </div>
  );
};

export default PropertyPanel;
