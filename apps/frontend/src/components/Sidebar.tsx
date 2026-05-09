import React from 'react';
import {
  Home,
  User,
  MessageSquare,
  Shield,
  LayoutTemplate,
  BarChart3,
  HelpCircle,
  Settings,
  Plus,
  Search,
  PanelLeft
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-midnight-900 border-r border-midnight-700 flex flex-col h-full text-midnight-100">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
             <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
               <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
             </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">Aether</span>
        </div>
        <div className="flex gap-2">
          <Plus size={18} className="text-midnight-400 cursor-pointer hover:text-white" />
          <Search size={18} className="text-midnight-400 cursor-pointer hover:text-white" />
          <PanelLeft size={18} className="text-midnight-400 cursor-pointer hover:text-white" />
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavItem label="Overview" active><Home size={18} /></NavItem>
        <NavItem label="Personal"><User size={18} /></NavItem>
        <NavItem label="Chat" badge="Preview"><MessageSquare size={18} /></NavItem>
      </nav>

      <div className="px-2 py-4 border-t border-midnight-700 space-y-1">
        <NavItem label="Admin Panel"><Shield size={18} /></NavItem>
        <NavItem label="Templates"><LayoutTemplate size={18} /></NavItem>
        <NavItem label="Insights"><BarChart3 size={18} /></NavItem>
        <NavItem label="Help" hasSubmenu><HelpCircle size={18} /></NavItem>
        <NavItem label="Settings" hasSubmenu><Settings size={18} /></NavItem>
      </div>
    </div>
  );
};

const NavItem = ({ children, label, active = false, badge, hasSubmenu = false }: any) => {
  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${active ? 'bg-midnight-800 text-white' : 'text-midnight-300 hover:bg-midnight-800 hover:text-white'}`}>
      <div className="flex items-center gap-3">
        {children}
        <span className="text-sm font-medium">{label}</span>
        {badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-600 text-white font-bold uppercase">
            {badge}
          </span>
        )}
      </div>
      {hasSubmenu && <span className="text-[10px]">›</span>}
    </div>
  );
};

export default Sidebar;
