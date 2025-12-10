import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, Cell
} from 'recharts';
import { Cpu, CheckCircle2, AlertTriangle, FileBarChart, BrainCircuit } from 'lucide-react';

const Models: React.FC = () => {
  // Importación segura de imágenes (para cuando las subas)
  const rocUrl = new URL('../curvas_roc_optimizados.png', import.meta.url).href;
  const shapUrl = new URL('../shap_beeswarm_rf.png', import.meta.url).href;
  const prUrl = new URL('../curvas_pr_optimizados.png', import.meta.url).href;

  const [imgError, setImgError] = useState({ roc: false, shap: false, pr: false });

  // DATOS REALES (Basados en tu Tabla 23 y Gráfico 1)
  const performanceData = [
    { model: 'Random Forest', auc: 0.751, f1_class1: 0.28, accuracy: 0.784 },
    { model: 'Gradient Boosting', auc: 0.720, f1_class1: 0.34, accuracy: 0.736 },
    { model: 'Regresión Logística', auc: 0.709, f1_class1: 0.38, accuracy: 0.712 },
  ];

  // Datos para la tabla detallada (Tabla 23)
  const detailedMetrics = [
    { 
      model: 'Gradient Boosting (Optimizado)', 
      auc: 0.72, 
      acc: 0.736, 
      f1: 0.34, 
      comment: 'Mejor equilibrio precisión-recall, buen AUC en validación.' 
    },
    { 
      model: 'Random Forest (Optimizado)', 
      auc: 0.75, 
      acc: 0.784, 
      f1: 0.28, 
      comment: 'Mayor AUC en prueba (0.751). Modelo más robusto y estable.' 
    },
    { 
      model: 'Regresión Logística', 
      auc: 0.71, 
      acc: 0.712, 
      f1: 0.38, 
      comment: 'Mejor F1 y Recall para la clase positiva (detecta más casos).' 
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Modelos Predictivos</h1>
        <p className="text-slate-500 mt-2 text-lg">Evaluación de algoritmos tras optimización bayesiana y balanceo SMOTE.</p>
      </header>

      {/* 1. RESUMEN DEL GANADOR */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2 text-emerald-400">
              <CheckCircle2 size={24} />
              <span className="font-bold tracking-wider uppercase text-sm">Modelo Seleccionado</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Random Forest</h2>
            <p className="text-slate-300 max-w-2xl">
              Seleccionado por presentar el mayor <strong>AUC-ROC (0.751)</strong>, demostrando la mejor capacidad 
              global para distinguir entre pacientes sanos y diabéticos, manteniendo una alta estabilidad (Accuracy 78.4%).
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 min-w-[200px] text-center">
            <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">AUC-ROC</p>
            <p className="text-4xl font-bold text-white">0.751</p>
          </div>
        </div>
      </div>

      {/* 2. GRÁFICO COMPARATIVO (Recreación Interactiva) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-6">
          <FileBarChart className="text-blue-600" />
          <h3 className="text-xl font-bold text-slate-800">Comparativa de Desempeño Global</h3>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="model" tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
              <YAxis tick={{fill: '#64748b'}} domain={[0, 1]} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="auc" name="AUC-ROC" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={50} />
              <Bar dataKey="f1_class1" name="F1 (Clase 1 - Diabetes)" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-500 mt-4 italic">
          Nota: Aunque Regresión Logística tiene mejor F1 para la clase 1, sacrifica demasiada precisión global.
        </p>
      </section>

      {/* 3. TABLA DETALLADA (Tabla 23) */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-800">Resultados tras Optimización Bayesiana</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Modelo</th>
                <th className="px-6 py-4">AUC-ROC</th>
                <th className="px-6 py-4">Accuracy</th>
                <th className="px-6 py-4">F1 (Clase 1)</th>
                <th className="px-6 py-4">Observación Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {detailedMetrics.map((m, idx) => (
                <tr key={idx} className={m.model.includes('Random Forest') ? 'bg-blue-50/30' : 'hover:bg-slate-50'}>
                  <td className="px-6 py-4 font-semibold text-slate-800">{m.model}</td>
                  <td className="px-6 py-4 font-mono text-blue-700 font-bold">{m.auc}</td>
                  <td className="px-6 py-4 text-slate-600">{m.acc}</td>
                  <td className="px-6 py-4 text-slate-600">{m.f1}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 italic">{m.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. IMÁGENES CIENTÍFICAS (ROC y SHAP) */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Curvas ROC */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Curvas ROC - Modelos Optimizados</h3>
          <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center min-h-[350px]">
            {!imgError.roc ? (
              <img 
                src={rocUrl} 
                alt="Curvas ROC"
                className="max-w-full h-auto object-contain"
                onError={() => setImgError(prev => ({...prev, roc: true}))}
              />
            ) : (
              <div className="text-center p-8 text-slate-400">
                <p>⚠️ Sube la imagen: <code>curvas_roc_optimizados.png</code></p>
              </div>
            )}
          </div>
        </section>

        {/* Curvas PR */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Curvas Precision-Recall</h3>
          <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex items-center justify-center min-h-[350px]">
             {!imgError.pr ? (
              <img 
                src={prUrl} 
                alt="Curvas Precision-Recall"
                className="max-w-full h-auto object-contain"
                onError={() => setImgError(prev => ({...prev, pr: true}))}
              />
            ) : (
              <div className="text-center p-8 text-slate-400">
                <p>⚠️ Sube la imagen: <code>curvas_pr_optimizados.png</code></p>
              </div>
            )}
          </div>
        </section>

        {/* Feature Importance (SHAP) - Ocupa 2 columnas */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <BrainCircuit className="text-purple-600" />
            <h3 className="font-bold text-slate-800 text-lg">Explicabilidad del Modelo (SHAP Values)</h3>
          </div>
          <p className="text-slate-500 mb-6">
            El gráfico "beeswarm" muestra cómo cada característica impacta la predicción. 
            Los puntos a la <strong>derecha</strong> aumentan el riesgo de diabetes, a la <strong>izquierda</strong> lo disminuyen.
          </p>
          
          <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center min-h-[400px]">
             {!imgError.shap ? (
              <img 
                src={shapUrl} 
                alt="SHAP Beeswarm Plot"
                className="max-w-full max-h-[600px] object-contain"
                onError={() => setImgError(prev => ({...prev, shap: true}))}
              />
            ) : (
              <div className="text-center p-12 bg-slate-50 w-full rounded-lg border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">Visualización SHAP no encontrada</p>
                <p className="text-sm text-slate-400 mt-2">Por favor sube el archivo <code>shap_beeswarm_rf.png</code> a la carpeta raíz.</p>
                <div className="mt-6 text-left max-w-md mx-auto text-sm text-slate-600">
                  <p className="font-bold mb-2">Hallazgos Clave (según tus datos):</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Edad:</strong> Principal factor de riesgo. Valores altos (rojo) aumentan drásticamente la probabilidad.</li>
                    <li><strong>Región y Sexo:</strong> Tienen un impacto considerable en la predicción.</li>
                    <li><strong>Sistólica y Cintura:</strong> Indicadores antropométricos críticos.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-bold text-amber-900 text-sm mb-1">Análisis de Resultados</h4>
            <p className="text-amber-800 text-sm leading-relaxed">
              Aunque el <strong>Random Forest</strong> es el modelo más robusto (mejor AUC), se observa una dificultad generalizada en todos los modelos para obtener un F1-score alto en la clase positiva (diabetes). Esto sugiere que, a pesar del balanceo con SMOTE, existe una complejidad inherente en separar las clases basándose únicamente en estas variables, lo cual es común en datos de encuestas poblacionales multifactoriales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;