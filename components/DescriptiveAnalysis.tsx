import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, AreaChart, Area, ComposedChart, Line, Cell
} from 'recharts';
import { Map, Info, Activity, ZoomIn, Users, Cigarette } from 'lucide-react';

const DescriptiveAnalysis: React.FC = () => {
  // Estados para controlar si las imágenes personalizadas cargaron correctamente
  const [imgLoadError, setImgLoadError] = useState<{sexo: boolean, fumar: boolean}>({
    sexo: false,
    fumar: false
  });

  const handleImgError = (key: 'sexo' | 'fumar') => {
    setImgLoadError(prev => ({ ...prev, [key]: true }));
  };

  // --- SOLUCIÓN DE IMÁGENES ---
  // Usamos "new URL" para importar las imágenes explícitamente.
  // Esto le dice a Vite: "Oye, incluye estos archivos en la versión final de Netlify".
  const mapaUrl = new URL('../mapa_diabetes_por_entidad.png', import.meta.url).href;
  const matrizUrl = new URL('../matriz_correlacion_elegante.png', import.meta.url).href;

  // DATOS REALES
  const agePrevalenceData = [
    { range: '60-69', value: 29.6, fill: '#5e548e' },
    { range: '70-79', value: 27.8, fill: '#5a7dcf' },
    { range: '80-89', value: 25.6, fill: '#4b86b4' },
    { range: '50-59', value: 18.5, fill: '#2a9d8f' },
    { range: '90-99', value: 16.7, fill: '#2a9d8f' },
    { range: '40-49', value: 9.6, fill: '#2ec4b6' },
    { range: '30-39', value: 3.0, fill: '#2ec4b6' },
    { range: '20-29', value: 0.7, fill: '#2ec4b6' },
  ];

  const sexPrevalenceData = [
    { name: 'Mujer', value: 13.9, fill: '#4b86b4' },
    { name: 'Hombre', value: 10.8, fill: '#2ec4b6' },
  ];

  const riskFactorsData = [
    { factor: 'Tabaquismo', no: 13.2, si: 14.7 },
    { factor: 'Alcohol', no: 13.5, si: 7.5 },
    { factor: 'Presión Alta', no: 7.9, si: 31.3 },
    { factor: 'Depresión', no: 11.5, si: 21.4 },
  ];

  const bmiCategoriesData = [
    { category: 'Bajo peso', value: 1.2 },
    { category: 'Normal', value: 21.1 },
    { category: 'Sobrepeso', value: 36.7 },
    { category: 'Obesidad I', value: 25.4 },
    { category: 'Obesidad II', value: 10.8 },
    { category: 'Obesidad III', value: 4.9 },
  ];

  const waistData = Array.from({ length: 50 }, (_, i) => {
    const x = 60 + i * 2;
    const density = Math.exp(-Math.pow(x - 95, 2) / (2 * Math.pow(15, 2))); 
    return { x, density: density * 500 }; 
  });

  const bmiDistributionData = Array.from({ length: 50 }, (_, i) => {
    const x = 15 + i;
    const density = Math.exp(-Math.pow(x - 28, 2) / (2 * Math.pow(6, 2)));
    return { x, density: density * 300 };
  });

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Análisis Descriptivo</h1>
        <p className="text-slate-500 mt-2 text-lg">
          Exploración visual de prevalencias y distribuciones - ENSANUT 2023
        </p>
      </header>

      {/* SECCIÓN 1: MAPA */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Map size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Prevalencia por Entidad Federativa</h2>
              <p className="text-sm text-slate-500">Distribución geográfica del riesgo</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 flex justify-center bg-slate-100/50 min-h-[400px] items-center group">
          <div className="relative rounded-xl overflow-hidden shadow-md bg-white p-2 transition-transform hover:scale-[1.01] duration-300">
            <img 
              src={mapaUrl}
              alt="Mapa de Prevalencia"
              className="max-w-full h-auto max-h-[600px] object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<div class="text-center text-slate-400 p-8 flex flex-col items-center"><p class="mb-2">⚠️ Imagen no encontrada</p><p class="text-sm">Vite no pudo procesar <strong>mapa_diabetes_por_entidad.png</strong>.</p></div>`;
              }}
            />
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-500 shadow-sm border border-slate-200 flex items-center">
              <ZoomIn size={12} className="mr-1" /> Zoom disponible
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1.5: MATRIZ DE CORRELACIÓN */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3 bg-slate-50">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Matriz de Correlación</h2>
              <p className="text-sm text-slate-500">Relación entre variables numéricas</p>
            </div>
        </div>
        <div className="p-8 flex justify-center bg-white min-h-[400px] items-center">
            <img 
              src={matrizUrl}
              alt="Matriz de Correlación"
              className="max-w-full max-h-[600px] rounded-lg shadow-md transition-transform hover:scale-[1.01] duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<div class="text-center text-slate-400 p-8"><p>Vite no pudo procesar <strong>matriz_correlacion_elegante.png</strong>.</p></div>`;
              }}
            />
        </div>
      </section>

      {/* SECCIÓN 2: PREVALENCIAS DEMOGRÁFICAS */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Gráfico 1: Edad */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6 text-center">Prevalencia de diabetes por grupo de edad</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agePrevalenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis unit="%" tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  formatter={(value: number) => [`${value}%`, 'Prevalencia']}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" name="Prevalencia" radius={[6, 6, 0, 0]}>
                  {agePrevalenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico 2: Sexo (Híbrido: Imagen o Gráfico) */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Users className="text-blue-500" size={20}/>
            <h3 className="font-bold text-slate-800 text-center">Prevalencia por Sexo</h3>
          </div>
          
          <div className="flex-1 flex items-center justify-center w-full min-h-[320px]">
            {!imgLoadError.sexo ? (
              <img 
                src="sexo_elegante.png"
                alt="Gráfico Sexo Elegante"
                className="max-h-[300px] max-w-full object-contain rounded-lg"
                onError={() => handleImgError('sexo')}
              />
            ) : (
              // Fallback al gráfico interactivo si la imagen no existe
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sexPrevalenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={100}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 14}} />
                  <YAxis unit="%" domain={[0, 16]} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    formatter={(value: number) => [`${value}%`, 'Prevalencia']}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                     {sexPrevalenceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>

      {/* SECCIÓN 3: FACTORES DE RIESGO */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-center space-x-2 mb-2">
           <Cigarette className="text-slate-400" size={20} />
           <h3 className="font-bold text-slate-800 text-center text-lg">Factores de Riesgo</h3>
        </div>
        <p className="text-center text-slate-500 mb-8 text-sm">Comparativa de prevalencia</p>
        
        <div className="h-96 w-full flex items-center justify-center">
           {!imgLoadError.fumar ? (
              <img 
                src="fumar_elegante.png"
                alt="Gráfico Fumar Elegante"
                className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                onError={() => handleImgError('fumar')}
              />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskFactorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="factor" tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                  <YAxis unit="%" tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Bar dataKey="no" name="No" fill="#2ec4b6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="si" name="Sí" fill="#5a7dcf" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start space-x-3">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Si subiste los archivos <code>sexo_elegante.png</code> y <code>fumar_elegante.png</code>, aparecerán automáticamente. Si no, verás las gráficas interactivas.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4: DISTRIBUCIONES ANTROPOMÉTRICAS */}
      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6 text-center">Distribución de categorías de IMC</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bmiCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="category" 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  interval={0}
                />
                <YAxis unit="%" tick={{fill: '#64748b'}} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Porcentaje']}
                  contentStyle={{borderRadius: '8px'}}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                   {bmiCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={[
                      '#5e548e', '#5a7dcf', '#3b82f6', '#2ec4b6', '#2a9d8f', '#2ec4b6'
                    ][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2 text-center">Distribución de Circunferencia de Cintura (cm)</h3>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waistData}>
                  <defs>
                    <linearGradient id="colorWaist" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2a9d8f" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#2a9d8f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="x" type="number" domain={[40, 160]} tick={{fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip labelFormatter={(v) => `${v} cm`} />
                  <Area type="monotone" dataKey="density" stroke="#2a9d8f" fillOpacity={1} fill="url(#colorWaist)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
          </div>
        </section>

         <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-2 text-center">Distribución de Índice de Masa Corporal (kg/m²)</h3>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bmiDistributionData}>
                  <defs>
                    <linearGradient id="colorBmi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4b86b4" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#4b86b4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="x" type="number" domain={[15, 60]} tick={{fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip labelFormatter={(v) => `${v} kg/m²`} />
                  <Area type="monotone" dataKey="density" stroke="#4b86b4" fillOpacity={1} fill="url(#colorBmi)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DescriptiveAnalysis;