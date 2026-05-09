import React, { useState } from 'react';
import { Search, X, Zap, Globe, Database, Cpu, MessageSquare, Box, ChevronRight, Wand2, LayoutTemplate, MessageCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All nodes', icon: 'Box' },
  { id: 'trigger', label: 'Triggers', icon: 'Zap' },
  { id: 'action', label: 'Actions', icon: 'Cpu' },
  { id: 'ai', label: 'AI', icon: 'Wand2' },
  { id: 'templates', label: 'Templates', icon: 'LayoutTemplate' },
  { id: 'community', label: 'Community', icon: 'Globe' },
];

const NODES = [
  { id: 'httpRequest', label: 'HTTP Request', category: 'action', description: 'Make an HTTP request and return the response data.', icon: 'Globe', iconColor: 'text-blue-400' },
  { id: 'postgres', label: 'PostgreSQL', category: 'action', description: 'Upsert, insert, update and query data from a PostgreSQL database.', icon: 'Database', iconColor: 'text-blue-600' },
  { id: 'openAi', label: 'OpenAI', category: 'ai', description: 'Use AI to generate text, images, and more.', icon: 'MessageSquare', iconColor: 'text-emerald-500' },
  { id: 'if', label: 'If', category: 'action', description: 'Split a workflow into two paths based on a condition.', icon: 'Box', iconColor: 'text-orange-400' },
  { id: 'code', label: 'Code', category: 'action', description: 'Write custom JavaScript to transform your data.', icon: 'Cpu', iconColor: 'text-yellow-500' },
  { id: 'tpl1', label: 'Discord Alert', category: 'templates', description: 'Starter template: Send a notification to Discord when a Webhook is received.', icon: 'MessageCircle', iconColor: 'text-indigo-400' },
  { id: 'com1', label: 'Slack Advanced', category: 'community', description: 'Community Node: Enhanced Slack integration with file upload support.', icon: 'MessageSquare', iconColor: 'text-pink-500' },
];

interface NodeLibraryProps {
  onAddNode: (type: string, data: any) => void;
  onClose: () => void;
}

const NodeLibrary: React.FC<NodeLibraryProps> = ({ onAddNode, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredNodes = NODES.filter(node =>
    (activeCategory === 'all' || node.category === activeCategory) &&
    (node.label.toLowerCase().includes(search.toLowerCase()) || node.description.toLowerCase().includes(search.toLowerCase()))
  );

  const getIcon = (iconName: string, size: number, colorClass?: string) => {
    switch (iconName) {
      case 'Box': return <Box size={size} className={colorClass} />;
      case 'Zap': return <Zap size={size} className={colorClass} />;
      case 'Cpu': return <Cpu size={size} className={colorClass} />;
      case 'Wand2': return <Wand2 size={size} className={colorClass} />;
      case 'Globe': return <Globe size={size} className={colorClass} />;
      case 'Database': return <Database size={size} className={colorClass} />;
      case 'MessageSquare': return <MessageSquare size={size} className={colorClass} />;
      case 'LayoutTemplate': return <LayoutTemplate size={size} className={colorClass} />;
      case 'MessageCircle': return <MessageCircle size={size} className={colorClass} />;
      default: return <Box size={size} className={colorClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight-900/60 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[600px] bg-midnight-800 rounded-2xl shadow-2xl border border-midnight-700 flex overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-midnight-700 flex flex-col bg-midnight-900/30">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Add node</h2>
            <nav className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-midnight-700 text-white shadow-lg' : 'text-midnight-400 hover:bg-midnight-700/50 hover:text-midnight-200'}`}
                >
                  {getIcon(cat.icon, 16)}
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-midnight-700">
             <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 cursor-pointer hover:text-indigo-300">
                <Wand2 size={14} />
                Ask AI to build
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-midnight-700 flex items-center gap-3">
             <Search size={20} className="text-midnight-500" />
             <input
               type="text"
               placeholder="Search nodes..."
               className="flex-1 bg-transparent border-none outline-none text-white placeholder-midnight-500 font-medium"
               autoFocus
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
             <button onClick={onClose} className="p-1 hover:bg-midnight-700 rounded transition-colors text-midnight-400">
               <X size={20} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4 content-start">
            {filteredNodes.map(node => (
              <button
                key={node.id}
                onClick={() => onAddNode(node.id, node)}
                className="group flex items-start gap-4 p-4 rounded-xl bg-midnight-900/50 border border-midnight-700 hover:border-indigo-500 hover:bg-midnight-700/30 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-midnight-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   {getIcon(node.icon, 20, node.iconColor)}
                </div>
                <div className="flex-1">
                   <div className="text-sm font-bold text-white mb-1">{node.label}</div>
                   <div className="text-xs text-midnight-400 line-clamp-2 leading-relaxed">{node.description}</div>
                </div>
                <ChevronRight size={16} className="text-midnight-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeLibrary;
