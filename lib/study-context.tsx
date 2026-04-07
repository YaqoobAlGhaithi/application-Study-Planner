import React, { createContext, useContext } from 'react';
import { useStudyData } from '@/hooks/use-study-data';
import { Goal, Task, AppSettings, Statistics, GoalCategory, GoalPriority, TaskPriority } from '@/lib/types';

interface StudyContextType {
  goals: Goal[];
  settings: AppSettings;
  loading: boolean;
  error: string | null;
  addGoal: (title: string, description: string, category: GoalCategory, priority: GoalPriority, dueDate: string) => Goal;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  addTask: (goalId: string, title: string, description: string | undefined, priority: TaskPriority, dueDate: string) => Task;
  updateTask: (goalId: string, task: Task) => void;
  deleteTask: (goalId: string, taskId: string) => void;
  updateSettings: (settings: AppSettings) => void;
  calculateStatistics: () => Statistics;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const {
    state,
    addGoal,
    updateGoal,
    deleteGoal,
    addTask,
    updateTask,
    deleteTask,
    updateSettings,
    calculateStatistics,
  } = useStudyData();

  const value: StudyContextType = {
    goals: state.goals,
    settings: state.settings,
    loading: state.loading,
    error: state.error,
    addGoal,
    updateGoal,
    deleteGoal,
    addTask,
    updateTask,
    deleteTask,
    updateSettings,
    calculateStatistics,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
