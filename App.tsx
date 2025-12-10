import React, { useState } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import Cover from './components/Cover';
import Introduction from './components/Introduction';
import DataDictionary from './components/DataDictionary';
import DescriptiveAnalysis from './components/DescriptiveAnalysis';
import Models from './components/Models';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.COVER);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case Section.COVER:
        return <Cover />;
      case Section.INTRODUCTION:
        return <Introduction />;
      case Section.DATA_DICTIONARY:
        return <DataDictionary />;
      case Section.DESCRIPTIVE_ANALYSIS:
        return <DescriptiveAnalysis />;
      case Section.MODELS:
        return <Models />;
      default:
        return <Cover />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-semibold text-slate-800">Dashboard Tesis</span>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <Sidebar 
          activeSection={activeSection} 
          onNavigate={(section) => {
            setActiveSection(section);
            setIsSidebarOpen(false);
          }} 
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
          
          <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500 pb-8">
            <p>Dashboard desarrollado para presentación de tesis | UTEL 2025</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;