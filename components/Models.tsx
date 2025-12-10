import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend
} from 'recharts';
import { ModelMetric } from '../types';
import { Cpu, CheckCircle2, AlertOctagon } from 'lucide-react';

const Models: React.FC = () => {
  // Mock Data - Replace with your actual model results
  const metricsData: ModelMetric[] = [
    { model: 'Regresión Logística', accuracy: 0.78, recall: 0.72, f1: 0.75, auc: 0.82 },
    { model: 'Random Forest', accuracy: 0.85, recall: 0.80, f1: 0.82, auc: 0.89 },
    { model: 'SVM', accuracy: 0.81, recall: 0.76, f1: 0.78, auc: 0.85 },
  ];

  const featureImportance = [
    { feature: 'Glucosa', importance: 0.35 },
    { feature: 'Edad', importance: 0.22 },
    { feature: 'IMC', importance: 0.18 },
    { feature: 'P. Sistólica', importance: 0.12 },
    { feature: 'C. Cintura', importance: 0.08 },
    { feature: 'Antecedentes', importance: 0.05 },
  ];

  // Mock ROC Curve data
  const rocData = [
    { fpr: 0, tpr_rf: 0, tpr_lr: 0, tpr_svm: 0 },
    { fpr: 0.1, tpr_rf: 0.5, tpr_lr: 0.4, tpr_svm: 0.45 },
    { fpr: 0.2, tpr_rf: 0.7, tpr_lr: 0.6, tpr_svm: 0.65 },
    { fpr: 0.3, tpr_rf: 0.85, tpr_lr: 0.75, tpr_svm: 0.78 },
    { fpr: 0.5, tpr_rf: 0.92, tpr_lr: 0.85, tpr_svm: 0.88 },
    { fpr: 0.8, tpr_rf: 0.97, tpr_lr: 0.94, tpr_svm: 0.95 },
    { fpr: 1, tpr_rf: 1, tpr_lr: 1, tpr_svm: 1 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Modelos Predictivos</h1>
        <p className="text-slate-500 mt-2 text-lg">Evaluación y comparación de algoritmos de Machine Learning.</p>
      </header>

      {/* Metrics Comparison Table */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Cpu className="text-blue-600" />
            <h2 className="font-bold text-slate-800">4.1 Métricas de Desempeño</h2>
          </div>
          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">Test Set (20%)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Modelo</th>
                <th className="px-6 py-4">Accuracy</th>
                <th className="px-6 py-4">Recall</th>
                <th className="px-6 py-4">F1-Score</th>
                <th className="px-6 py-4">AUC-ROC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metricsData.map((m, idx) => (
                <tr key={idx} className={m.model === 'Random Forest' ? 'bg-blue-50/50' : ''}>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {m.model}
                    {m.model === 'Random Forest' && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">Mejor</span>}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{m.accuracy}</td>
                  <td className="px-6 py-4 text-slate-600">{m.recall}</td>
                  <td className="px-6 py-4 text-slate-600">{m.f1}</td>
                  <td className="px-6 py-4 font-mono text-blue-600">{m.auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ROC Curves */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6">4.2 Curvas ROC Comparativas</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rocData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="fpr" type="number" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="tpr_rf" name="Random Forest" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tpr_lr" name="Reg. Logística" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tpr_svm" name="SVM" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="fpr" name="Referencia" stroke="#cbd5e1" strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Feature Importance */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-6">4.3 Importancia de Variables (SHAP)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" />
                <YAxis dataKey="feature" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Importancia Relativa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Confusion Matrix (Conceptual Visualization) */}
      <section>
        <h3 className="font-bold text-slate-800 mb-6">4.4 Matriz de Confusión (Random Forest)</h3>
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
            <p className="text-emerald-800 font-bold text-2xl">TN</p>
            <p className="text-sm text-emerald-600">Verdaderos Negativos</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">1,245</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl text-center">
            <p className="text-rose-800 font-bold text-2xl">FP</p>
            <p className="text-sm text-rose-600">Falsos Positivos</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">120</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl text-center">
            <p className="text-rose-800 font-bold text-2xl">FN</p>
            <p className="text-sm text-rose-600">Falsos Negativos</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">85</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center">
            <p className="text-emerald-800 font-bold text-2xl">TP</p>
            <p className="text-sm text-emerald-600">Verdaderos Positivos</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">450</p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <div className="bg-slate-800 text-white rounded-xl p-8 mt-12">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <CheckCircle2 className="mr-3 text-emerald-400" />
          Conclusión del Modelo
        </h3>
        <p className="leading-relaxed opacity-90">
          El modelo <strong>Random Forest</strong> demostró el mejor desempeño global con un AUC de 0.89. 
          Las variables de <strong>Glucosa</strong> y <strong>Edad</strong> fueron los predictores más fuertes.
          Este modelo es el candidato seleccionado para su implementación en herramientas de tamizaje clínico.
        </p>
      </div>
    </div>
  );
};

export default Models;