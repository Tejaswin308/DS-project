import { useState, useCallback } from 'react';
import type { Experiment, ExperimentFormData } from '../types/experiment';
import { loadExperiments, saveExperiments, generateId } from '../utils/storage';

export function useExperiments() {
  const [experiments, setExperiments] = useState<Experiment[]>(() => loadExperiments());

  const addExperiment = useCallback((data: ExperimentFormData) => {
    const now = new Date().toISOString();
    const newExp: Experiment = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setExperiments(prev => {
      const updated = [...prev, newExp].sort((a, b) => a.number - b.number);
      saveExperiments(updated);
      return updated;
    });
    return newExp;
  }, []);

  const updateExperiment = useCallback((id: string, data: ExperimentFormData) => {
    setExperiments(prev => {
      const updated = prev
        .map(exp =>
          exp.id === id
            ? { ...exp, ...data, updatedAt: new Date().toISOString() }
            : exp
        )
        .sort((a, b) => a.number - b.number);
      saveExperiments(updated);
      return updated;
    });
  }, []);

  const deleteExperiment = useCallback((id: string) => {
    setExperiments(prev => {
      const updated = prev.filter(exp => exp.id !== id);
      saveExperiments(updated);
      return updated;
    });
  }, []);

  const getExperiment = useCallback(
    (id: string) => experiments.find(exp => exp.id === id),
    [experiments]
  );

  const searchExperiments = useCallback(
    (query: string) => {
      if (!query.trim()) return experiments;
      const q = query.toLowerCase().trim();
      return experiments.filter(
        exp =>
          exp.title.toLowerCase().includes(q) ||
          String(exp.number).includes(q) ||
          exp.description.toLowerCase().includes(q) ||
          exp.topics.some(t => t.toLowerCase().includes(q))
      );
    },
    [experiments]
  );

  const stats = {
    total: experiments.length,
    subTotal: experiments.length * 2,
    completedPercent: experiments.length > 0 ? 100 : 0,
  };

  return {
    experiments,
    addExperiment,
    updateExperiment,
    deleteExperiment,
    getExperiment,
    searchExperiments,
    stats,
  };
}
