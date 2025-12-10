import React from 'react';
import { AlertTriangle, TrendingUp, Target, CheckCircle2 } from 'lucide-react';

const Introduction: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">Introducción</h1>
        <p className="text-slate-500 mt-2 text-lg">Contexto, problemática y objetivos del estudio.</p>
      </header>

      {/* Problem Statement */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <AlertTriangle size={120} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">1️⃣</span>
          Planteamiento del Problema
        </h2>
        <div className="prose max-w-none text-slate-600 leading-relaxed">
          <p className="mb-4">
            La diabetes mellitus tipo 2 representa uno de los principales desafíos de salud pública en México. 
            Según datos oficiales de la ENSANUT 2023 <strong>(INSP, 2023)</strong>, la prevalencia de diabetes diagnosticada y no diagnosticada en adultos ha mostrado tendencias alarmantes.
          </p>
          <p>
            La detección tardía y el control inadecuado generan complicaciones graves que impactan significativamente 
            la calidad de vida y representan una carga económica sustancial para el sistema de salud nacional. 
            Se estima que el gasto asociado a la atención de complicaciones consume un porcentaje mayoritario del presupuesto destinado a esta enfermedad <strong>(Federación Mexicana de Diabetes, 2023)</strong>.
          </p>
        </div>
      </section>

      {/* Impact Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="text-amber-600" />
            <h3 className="font-bold text-amber-900">Impacto Epidemiológico</h3>
          </div>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
              Alta prevalencia en adultos (INSP, 2023)
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
              Incremento en zonas urbanas
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
              Principal causa de discapacidad (INEGI, 2023)
            </li>
          </ul>
        </div>

        <div className="bg-rose-50 rounded-xl p-6 border-l-4 border-rose-500 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="text-rose-600" />
            <h3 className="font-bold text-rose-900">Impacto Económico</h3>
          </div>
          <ul className="space-y-2 text-rose-800">
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-rose-500 rounded-full"></span>
              Alta carga al gasto público
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-rose-500 rounded-full"></span>
              Costos indirectos por pérdida de productividad
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 bg-rose-500 rounded-full"></span>
              Complicaciones renales y cardiovasculares costosas
            </li>
          </ul>
        </div>
      </div>

      {/* Objectives */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">3️⃣</span>
          Objetivo General
        </h2>
        <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 italic text-slate-700 text-lg mb-8 text-justify leading-relaxed">
          "El objetivo general de esta investigación es desarrollar y evaluar un modelo predictivo de riesgo de diabetes 
          en la población adulta mexicana utilizando técnicas de aprendizaje supervisado aplicadas a los datos de la 
          Encuesta Nacional de Salud y Nutrición (ENSANUT) 2023. Este objetivo busca identificar qué variables clínicas, 
          antropométricas y de estilo de vida contribuyen de manera significativa al riesgo de desarrollar diabetes, 
          así como determinar la capacidad predictiva de algoritmos como la regresión logística y el Support Vector Machine (SVM). 
          Al cumplir este propósito, se pretende generar evidencia útil para la identificación temprana de riesgo y apoyar 
          futuras estrategias de prevención y control de la diabetes en México."
        </div>

        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <Target className="mr-2 text-blue-600" size={20} />
          Objetivos Específicos
        </h3>
        <div className="grid gap-4">
          {[
            "Seleccionar, depurar y preparar las variables demográficas, clínicas, antropométricas y de estilo de vida de ENSANUT 2023.",
            "Realizar un análisis exploratorio de datos (EDA) para comprender distribuciones y patrones entre factores de riesgo.",
            "Implementar y entrenar algoritmos de Machine Learning (Regresión Logística, Random Forest, SVM).",
            "Evaluar el rendimiento utilizando métricas clave: precisión, recall, F1-score, AUC-ROC y matriz de confusión.",
            "Identificar y analizar los factores de riesgo más influyentes (Feature Importance) según el modelo óptimo.",
            "Proponer recomendaciones estratégicas para fortalecer programas de detección temprana y prevención."
          ].map((obj, idx) => (
            <div key={idx} className="flex items-start bg-slate-50 p-4 rounded-lg hover:bg-blue-50 transition-colors">
              <CheckCircle2 className="text-emerald-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
              <span className="text-slate-700">{obj}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Introduction;