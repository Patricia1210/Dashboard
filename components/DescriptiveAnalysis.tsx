import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, AreaChart, Area, ComposedChart, Line, Cell
} from 'recharts';
import { Map, Info } from 'lucide-react';

const DescriptiveAnalysis: React.FC = () => {
  // DATOS REALES EXTRAÍDOS DE LAS IMÁGENES PROPORCIONADAS

  // 1. Prevalencia de diabetes por grupo de edad
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

  // 2. Prevalencia de diabetes por sexo
  const sexPrevalenceData = [
    { name: 'Mujer', value: 13.9, fill: '#4b86b4' },
    { name: 'Hombre', value: 10.8, fill: '#2ec4b6' },
  ];

  // 3. Prevalencia de Factores de Riesgo (Agrupado)
  const riskFactorsData = [
    { factor: 'Tabaquismo', no: 13.2, si: 14.7 },
    { factor: 'Alcohol', no: 13.5, si: 7.5 },
    { factor: 'Presión Alta', no: 7.9, si: 31.3 },
    { factor: 'Depresión', no: 11.5, si: 21.4 },
  ];

  // 4. Distribución de categorías de IMC
  const bmiCategoriesData = [
    { category: 'Bajo peso', value: 1.2 },
    { category: 'Normal', value: 21.1 },
    { category: 'Sobrepeso', value: 36.7 },
    { category: 'Obesidad I', value: 25.4 },
    { category: 'Obesidad II', value: 10.8 },
    { category: 'Obesidad III', value: 4.9 },
  ];

  // 5. Datos simulados para recrear las curvas de distribución (Histogramas)
  const waistData = Array.from({ length: 50 }, (_, i) => {
    const x = 60 + i * 2;
    // Simulación de curva normal centrada en ~95
    const density = Math.exp(-Math.pow(x - 95, 2) / (2 * Math.pow(15, 2))); 
    return { x, density: density * 500 }; // Escalar para visualización
  });

  const bmiDistributionData = Array.from({ length: 50 }, (_, i) => {
    const x = 15 + i;
    // Simulación de curva log-normal o skewed centrada en ~28
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

      {/* SECCIÓN 1: MAPA INTERACTIVO */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Map size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Prevalencia por Entidad Federativa</h2>
              <p className="text-sm text-slate-500">Mapa coroplético interactivo</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
            src: /mapa_interactivo.html
          </span>
        </div>
        
        {/* Contenedor del Mapa */}
        <div className="w-full h-[600px] bg-slate-100 relative group">
          {/* Instrucciones visibles si no carga el iframe */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="text-center p-8 max-w-lg">
              <Map size={64} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600">Visualizador de Mapa</h3>
              <p className="text-slate-500 mt-2 text-sm">
                Para ver tu mapa interactivo aquí, guarda tu archivo HTML generado (ej. Folium) como 
                <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 mx-1">mapa_interactivo.html</code> 
                en la carpeta <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700 mx-1">public/</code> de tu proyecto.
              </p>
            </div>
          </div>

          {/* IFRAME: Apunta al archivo estático en public/ */}
          <iframe 
            src="/mapa_interactivo.html" 
            className="w-full h-full relative z-10 border-0"
            title="Mapa Interactivo ENSANUT"
            sandbox="allow-scripts allow-popups allow-same-origin"
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
                  {/* Etiquetas encima de las barras */}
                  {/* Nota: LabelList se podría agregar aquí si se desea */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico 2: Sexo */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6 text-center">Prevalencia de diabetes por sexo</h3>
          <div className="h-80 w-full">
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
          </div>
        </section>
      </div>

      {/* SECCIÓN 3: FACTORES DE RIESGO */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-2 text-center text-lg">Prevalencia de Factores de Riesgo por Categoría</h3>
        <p className="text-center text-slate-500 mb-8 text-sm">Comparación de prevalencia de diabetes según presencia (Sí) o ausencia (No) del factor</p>
        
        <div className="h-96 w-full">
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
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start space-x-3">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-blue-800">
            <strong>Interpretación:</strong> Se observa una diferencia drástica en la prevalencia de diabetes en personas con hipertensión (31.3%) comparado con quienes no la padecen (7.9%), destacando la fuerte comorbilidad entre ambas condiciones.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4: DISTRIBUCIONES ANTROPOMÉTRICAS */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Gráfico 4: IMC Categorías */}
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
                    // Gradiente de colores basado en severidad
                    <Cell key={`cell-${index}`} fill={[
                      '#5e548e', // Bajo peso
                      '#5a7dcf', // Normal
                      '#3b82f6', // Sobrepeso
                      '#2ec4b6', // Obesidad I
                      '#2a9d8f', // Obesidad II
                      '#2ec4b6'  // Obesidad III
                    ][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Gráfico 5: Distribución Cintura */}
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

         {/* Gráfico 6: Distribución IMC */}
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