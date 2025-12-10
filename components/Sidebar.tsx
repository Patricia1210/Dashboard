import React from 'react';
import { Section } from '../types';
import { Home, FileText, Database, BarChart2, Download, Share2, BrainCircuit, Cpu, Calculator } from 'lucide-react';

interface SidebarProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const menuItems = [
    { id: Section.COVER, icon: Home, label: 'Inicio' },
    { id: Section.INTRODUCTION, icon: FileText, label: 'Introducción' },
    { id: Section.DATA_DICTIONARY, icon: Database, label: 'Diccionario de Datos' },
    { id: Section.DESCRIPTIVE_ANALYSIS, icon: BarChart2, label: 'Análisis Descriptivo' },
    { id: Section.MODELS, icon: Cpu, label: 'Modelos Predictivos' },
    { id: Section.PREDICTIVE_APP, icon: Calculator, label: 'Simulador Interactivo' },
  ];

  const currentIndex = menuItems.findIndex(item => item.id === activeSection) + 1;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <BrainCircuit size={24} />
          </div>
          <h2 className="font-bold text-slate-800 text-lg">Dashboard Tesis</h2>
        </div>
        <p className="text-sm font-medium text-slate-500">Predicción Diabetes T2</p>
        
        <div className="mt-4 space-y-1">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Fuente</div>
          <div className="text-xs text-slate-600">ENSANUT 2023</div>
          <div className="text-xs text-slate-600">Machine Learning Analysis</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95">
            <Download size={16} />
            <span>Exportar PDF</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-blue-200 transition-all active:scale-95">
            <Share2 size={16} />
            <span>Compartir</span>
          </button>
        </div>
        
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>Sección {currentIndex} de {menuItems.length}</span>
          <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(currentIndex / menuItems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;