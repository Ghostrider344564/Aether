import React, { useState } from 'react';
import { X, Info, ExternalLink, ChevronDown, Globe, Database, MessageSquare, Box, Cpu, MessageCircle, Zap, Wand2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface FullPropertyDrawerProps {
  node: any;
  onClose: () => void;
  onUpdate: (updatedNode: any) => void;
}

const FullPropertyDrawer: React.FC<FullPropertyDrawerProps> = ({ node, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('parameters');

  return (
    <div className="fixed inset-y-0 right-0 w-[1100px] bg-midnight-800 shadow-2xl border-l border-midnight-700 flex flex-col z-[60] animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="h-14 border-b border-midnight-700 flex items-center justify-between px-4 bg-midnight-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-midnight-700 flex items-center justify-center text-white">
             {typeof node.data.icon === 'string' ? (
                <div className={node.data.iconColor}>
                   {node.data.icon === 'Globe' && <Globe size={16} />}
                   {node.data.icon === 'Database' && <Database size={16} />}
                   {node.data.icon === 'MessageSquare' && <MessageSquare size={16} />}
                   {node.data.icon === 'Box' && <Box size={16} />}
                   {node.data.icon === 'Cpu' && <Cpu size={16} />}
                   {node.data.icon === 'MessageCircle' && <MessageCircle size={16} />}
                   {node.data.icon === 'Zap' && <Zap size={16} />}
                   {node.data.icon === 'Wand2' && <Wand2 size={16} />}
                </div>
             ) : (node.data.icon || <Box size={16} />)}
          </div>
          <h2 className="font-bold text-white">{node.data.label}</h2>
          <div className="flex items-center gap-1 ml-4 px-2 py-0.5 rounded bg-midnight-700 text-midnight-400 cursor-pointer hover:bg-midnight-600">
             <Info size={14} />
             <span className="text-xs font-semibold uppercase">Docs</span>
             <ExternalLink size={12} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-midnight-400 cursor-pointer hover:text-white mr-4">
             <ChevronDown size={18} />
          </div>
          <button onClick={onClose} className="p-2 text-midnight-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Areas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: INPUT */}
        <div className="w-1/3 border-r border-midnight-700 flex flex-col bg-midnight-900/20">
          <div className="p-3 border-b border-midnight-700 flex items-center justify-between">
            <span className="text-xs font-bold text-midnight-400 uppercase tracking-widest">Input</span>
            <div className="flex gap-1 bg-midnight-800 p-0.5 rounded border border-midnight-700">
               <button className="px-2 py-0.5 text-[10px] font-bold rounded bg-midnight-700 text-white">Mapping</button>
               <button className="px-2 py-0.5 text-[10px] font-bold rounded text-midnight-400 hover:text-white">From AI</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-midnight-500 mb-4">
               <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto fill-none stroke-current" strokeWidth="1.5">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
            <p className="text-sm font-semibold text-midnight-300">No input data</p>
            <button className="mt-4 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded shadow-lg transition-all active:scale-95">
              Execute previous nodes
            </button>
            <p className="mt-2 text-[11px] text-midnight-500">to view input data</p>
          </div>
        </div>

        {/* Middle Column: PARAMETERS */}
        <div className="w-1/3 flex flex-col relative">
          <div className="flex border-b border-midnight-700 bg-midnight-900/20">
            <TabButton active={activeTab === 'parameters'} onClick={() => setActiveTab('parameters')}>Parameters</TabButton>
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Settings</TabButton>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">Credential</label>
              <div className="flex gap-2">
                <select className="flex-1 bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>No credentials yet</option>
                </select>
                <button className="px-3 py-2 bg-midnight-700 hover:bg-midnight-600 text-white text-xs font-bold rounded border border-midnight-600">
                  Set up credential
                </button>
              </div>
            </div>

            {/* Dynamic Fields Based on Node Type */}
            {node.id === 'code' || node.data.label === 'Code' ? (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-midnight-400 uppercase">JavaScript Code</label>
                <div className="h-80 border border-midnight-700 rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue="// Loop over input items and add a new field
for (const item of $input.all()) {
  item.json.myNewField = 1;
}

return $input.all();"
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-midnight-400 uppercase mb-2">Model (Deployment) Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-midnight-900 border border-midnight-700 rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none pr-8"
                    placeholder=""
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400">
                    <Info size={14} />
                  </div>
                </div>
              </div>
            )}

            <div>
               <div className="flex items-center justify-between mb-2">
                 <label className="block text-xs font-bold text-midnight-400 uppercase">Options</label>
               </div>
               <div className="space-y-2">
                 {(node.data.parameters?.options || []).map((opt: any, idx: number) => (
                   <div key={idx} className="bg-midnight-900/50 p-3 rounded-lg border border-midnight-700 flex items-center justify-between">
                     <span className="text-sm text-white">{opt.label || 'New Option'}</span>
                     <button
                       onClick={() => {
                         const newOptions = [...(node.data.parameters.options || [])];
                         newOptions.splice(idx, 1);
                         onUpdate({ ...node, data: { ...node.data, parameters: { ...node.data.parameters, options: newOptions } } });
                       }}
                       className="text-midnight-500 hover:text-red-400"
                     >
                       <X size={14} />
                     </button>
                   </div>
                 ))}

                 {(!node.data.parameters?.options || node.data.parameters.options.length === 0) && (
                   <div className="p-4 border border-dashed border-midnight-700 rounded text-center text-xs text-midnight-500 mb-2">
                     No options selected
                   </div>
                 )}
               </div>
               <button
                 onClick={() => {
                    const newOptions = [...(node.data.parameters?.options || []), { label: 'Property ' + ((node.data.parameters?.options?.length || 0) + 1) }];
                    onUpdate({ ...node, data: { ...node.data, parameters: { ...node.data.parameters, options: newOptions } } });
                 }}
                 className="w-full mt-2 py-2 bg-midnight-900 border border-midnight-700 rounded flex items-center justify-center gap-2 text-xs font-bold text-midnight-100 hover:bg-midnight-800 transition-colors"
               >
                 Add Option <ChevronDown size={14} />
               </button>
            </div>
          </div>

          <div className="p-4 border-t border-midnight-700 bg-midnight-900/30">
            <div className="flex items-center gap-2 text-midnight-500 hover:text-white cursor-pointer group">
               <div className="w-5 h-5 rounded-full border border-midnight-600 flex items-center justify-center group-hover:border-white">
                  <Info size={10} />
               </div>
               <span className="text-xs font-medium">I wish this node would...</span>
            </div>
          </div>
        </div>

        {/* Right Column: OUTPUT */}
        <div className="w-1/3 border-l border-midnight-700 flex flex-col bg-midnight-900/20">
          <div className="p-3 border-b border-midnight-700">
            <span className="text-xs font-bold text-midnight-400 uppercase tracking-widest">Output</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
             <div className="text-midnight-500 mb-4 rotate-180">
               <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto fill-none stroke-current" strokeWidth="1.5">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
            <p className="text-sm font-semibold text-midnight-300">No output data</p>
            <p className="mt-2 text-[11px] text-midnight-500">Output will appear here once the parent node is run</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, children, onClick }: any) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${active ? 'border-indigo-500 text-white' : 'border-transparent text-midnight-500 hover:text-midnight-300'}`}
  >
    {children}
  </button>
);

export default FullPropertyDrawer;
