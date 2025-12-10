import React from 'react';
import { ExternalLink, Smartphone } from 'lucide-react';

const PredictiveApp: React.FC = () => {
  const appUrl = "https://predicciondiabetesapp-ffseswtxd6rbps6lbnyaab.streamlit.app/?embed=true";

  return (
    <div className="space-y-8 animate-fade-in h-full flex flex-col">
      <header className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Simulador Interactivo</h1>
            <p className="text-slate-500 mt-2 text-lg">Prueba el modelo de Machine Learning en tiempo real.</p>
          </div>
          <a 
            href="https://predicciondiabetesapp-ffseswtxd6rbps6lbnyaab.streamlit.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap"
          >
            <ExternalLink size={18} />
            <span>Abrir en pantalla completa</span>
          </a>
        </div>
      </header>

      {/* Embed Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative min-h-[800px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 z-0">
          <Smartphone size={48} className="mb-4 opacity-20" />
          <p>Cargando aplicación...</p>
        </div>
        <iframe
          src={appUrl}
          title="App Predictiva Streamlit"
          className="w-full h-full absolute inset-0 z-10"
          style={{ border: 'none' }}
          allow="camera; microphone; geolocation"
        />
      </div>

      <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-500 text-center">
        Nota: Esta aplicación se ejecuta en los servidores de Streamlit Cloud. Si tarda en cargar, por favor presiona el botón "Abrir en pantalla completa".
      </div>
    </div>
  );
};

export default PredictiveApp;