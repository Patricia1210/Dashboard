export enum Section {
  COVER = 'Portada',
  INTRODUCTION = 'Introducción',
  DATA_DICTIONARY = 'Diccionario de Datos',
  DESCRIPTIVE_ANALYSIS = 'Análisis Descriptivo',
  MODELS = 'Modelos Predictivos',
  PREDICTIVE_APP = 'Simulador Interactivo'
}

export interface VariableDefinition {
  variable: string;
  type: string;
  description: string;
  valuesOrUnit: string;
}

export interface ComparisonData {
  variable: string;
  noDiabetes: string;
  diabetes: string;
  pValue: string;
}

export interface ModelMetric {
  model: string;
  accuracy: number;
  recall: number;
  f1: number;
  auc: number;
}