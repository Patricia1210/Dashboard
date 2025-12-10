import React from 'react';
import { GraduationCap, Activity, Users, Mail } from 'lucide-react';

const Cover: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wider uppercase mb-2">
          Proyecto de Tesis
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">
          Inicio
        </h1>
        <p className="text-xl text-slate-500 font-light">
          Información del proyecto
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Decorative Top Border */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />
          
          <div className="p-8 md:p-12 text-center">
            {/* Logo Placeholder */}
            <div className="mb-10 relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 ring-8 ring-blue-50">
                <span className="text-white text-3xl font-bold tracking-widest font-serif">UTEL</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-serif leading-tight">
              Modelo Predictivo de Diabetes Mellitus Tipo 2 <br className="hidden md:block"/>
              mediante <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Machine Learning</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-500 mb-10 font-light">
              Análisis de Datos ENSANUT 2023
            </p>

            {/* Divider */}
            <div className="w-24 h-1 bg-slate-200 mx-auto rounded-full mb-10" />

            {/* Author Info */}
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 text-slate-600 mb-6">
                  <Users size={20} className="text-blue-500" />
                  <span className="font-medium uppercase tracking-wide text-xs">Tesistas</span>
                </div>
                
                <div className="space-y-6 w-full max-w-md">
                  {/* Autor 1 */}
                  <div className="text-center group">
                    <p className="text-2xl font-bold text-blue-800">Patricia Herrejón Calderón</p>
                    <a 
                      href="mailto:nutriherrejon@gmail.com" 
                      className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors mt-1 text-sm font-medium"
                    >
                      <Mail size={14} />
                      <span>nutriherrejon@gmail.com</span>
                    </a>
                  </div>

                  {/* Autor 2 */}
                  <div className="text-center group">
                    <p className="text-2xl font-bold text-blue-800">Luis Corona Alcantar</p>
                    <a 
                      href="mailto:lca1643@gmail.com" 
                      className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors mt-1 text-sm font-medium"
                    >
                      <Mail size={14} />
                      <span>lca1643@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-4 border-t border-slate-50">
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <GraduationCap size={18} />
                  <span className="font-medium">Maestría en Ciencia de Datos</span>
                </div>
                <p className="text-slate-500 mt-1">Universidad Tecnológica Latinoamericana en Línea</p>
                <p className="text-blue-600 font-bold mt-2">2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Card */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="mt-1 bg-blue-200 p-2 rounded-lg text-blue-700 hidden sm:block">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Resumen Ejecutivo</h3>
              <p className="text-slate-700 leading-relaxed text-justify">
                El objetivo general de esta investigación es desarrollar y evaluar un modelo predictivo de riesgo de diabetes 
                en la población adulta mexicana utilizando técnicas de aprendizaje supervisado aplicadas a los datos de la 
                <strong> Encuesta Nacional de Salud y Nutrición (ENSANUT) 2023</strong>. Este objetivo busca identificar qué variables clínicas, 
                antropométricas y de estilo de vida contribuyen de manera significativa al riesgo de desarrollar diabetes, 
                así como determinar la capacidad predictiva de algoritmos como la regresión logística y el Support Vector Machine (SVM).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;