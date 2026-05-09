import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Globe, Database, MessageSquare, Box, Cpu, MessageCircle, Zap, Wand2 } from 'lucide-react';

const getIcon = (iconName: string, size: number, colorClass?: string) => {
  switch (iconName) {
    case 'Globe': return <Globe size={size} className={colorClass} />;
    case 'Database': return <Database size={size} className={colorClass} />;
    case 'MessageSquare': return <MessageSquare size={size} className={colorClass} />;
    case 'Box': return <Box size={size} className={colorClass} />;
    case 'Cpu': return <Cpu size={size} className={colorClass} />;
    case 'MessageCircle': return <MessageCircle size={size} className={colorClass} />;
    case 'Zap': return <Zap size={size} className={colorClass} />;
    case 'Wand2': return <Wand2 size={size} className={colorClass} />;
    default: return <Box size={size} className={colorClass} />;
  }
};

export const CustomNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={`group relative w-[220px] rounded-xl bg-midnight-800 border-2 transition-all ${selected ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-midnight-700 hover:border-midnight-600'}`}>
      <div className="p-4 flex items-center gap-4">
        <div className="w-10 h-10 min-w-[40px] rounded-xl bg-midnight-900 flex items-center justify-center text-white shadow-inner border border-midnight-700">
          {typeof data.icon === 'string' ? getIcon(data.icon, 20, data.iconColor) : (data.icon || <Box size={20} />)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-midnight-400 uppercase tracking-wider">{data.category || 'Node'}</div>
          <div className="text-sm font-semibold text-white truncate">{data.label}</div>
        </div>

        {/* Plus button handle placeholder - in n8n this is often dynamic */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="w-6 h-6 bg-midnight-700 border border-midnight-600 rounded flex items-center justify-center text-white hover:bg-midnight-600 cursor-pointer">
             <PlusIcon size={14} />
           </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-midnight-600 !border-2 !border-midnight-800 !-left-1.5"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-midnight-600 !border-2 !border-midnight-800 !-right-1.5"
      />
    </div>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
