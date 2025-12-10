import React from 'react';
import { VariableDefinition } from '../types';
import { Info, Database, Ruler } from 'lucide-react';

const DataDictionary: React.FC = () => {
  const adultVariables: VariableDefinition[] = [
    { variable: 'edad', type: 'Numérica', description: 'Edad en años cumplidos', valuesOrUnit: '20-98' },
    { variable: 'sexo', type: 'Categórica', description: 'Sexo del participante', valuesOrUnit: '1=Hombre, 2=Mujer' },
    { variable: 'diabetes_dx', type: 'Binaria', description: 'Diagnóstico previo de diabetes', valuesOrUnit: '0=No, 1=Sí' },
    { variable: 'tabaquismo', type: 'Categórica', description: 'Consumo de tabaco', valuesOrUnit: '0=Nunca, 1=Ex, 2=Actual' },
    { variable: 'alcohol', type: 'Binaria', description: 'Consumo de alcohol habitual', valuesOrUnit: '0=No, 1=Sí' },
    { variable: 'nse', type: 'Ordinal', description: 'Nivel socioeconómico', valuesOrUnit: '1=Bajo, 2=Medio, 3=Alto' },
  ];

  const anthropometricVariables: VariableDefinition[] = [
    { variable: 'imc', type: 'Numérica', description: 'Índice de masa corporal', valuesOrUnit: 'kg/m²' },
    { variable: 'peso', type: 'Numérica', description: 'Peso corporal', valuesOrUnit: 'kg' },
    { variable: 'talla', type: 'Numérica', description: 'Estatura', valuesOrUnit: 'cm' },
    { variable: 'presion_sistolica', type: 'Numérica', description: 'Presión arterial sistólica', valuesOrUnit: 'mmHg' },
    { variable: 'presion_diastolica', type: 'Numérica', description: 'Presión arterial diastólica', valuesOrUnit: 'mmHg' },
    { variable: 'glucosa', type: 'Numérica', description: 'Glucosa sérica en ayuno', valuesOrUnit: 'mg/dL' },
    { variable: 'circunf_cintura', type: 'Numérica', description: 'Circunferencia de cintura', valuesOrUnit: 'cm' },
  ];

  const TableSection = ({ title, icon: Icon, data, colorClass }: { title: string, icon: any, data: VariableDefinition[], colorClass: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className={`px-6 py-4 border-b border-slate-100 flex items-center ${colorClass} bg-opacity-10`}>
        <div className={`p-2 rounded-lg ${colorClass} text-white mr-3`}>
          <Icon size={20} />
        </div>
        <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Variable</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Descripción</th>
              <th className="px-6 py-4">Valores / Unidades</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-blue-600 font-medium">{row.variable}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {row.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900">{row.description}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">{row.valuesOrUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Diccionario de Datos</h1>
        <p className="text-slate-500 mt-2 text-lg">Definición de variables y estructura de las bases de datos.</p>
      </header>

      <TableSection 
        title="Base de Datos: Adultos ENSANUT" 
        icon={Database} 
        data={adultVariables} 
        colorClass="bg-indigo-600"
      />

      <TableSection 
        title="Base de Datos: Antropométrica" 
        icon={Ruler} 
        data={anthropometricVariables} 
        colorClass="bg-emerald-600"
      />

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start gap-3">
        <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
        <div>
          <h4 className="font-bold text-blue-900 text-sm mb-1">Nota Metodológica</h4>
          <p className="text-blue-800 text-sm leading-relaxed">
            Las bases fueron fusionadas mediante identificador único de participante (Folio). 
            Se implementó limpieza de valores atípicos (regla IQR 1.5) y manejo de datos faltantes 
            (imputación MICE) previo al análisis exploratorio y modelado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataDictionary;