import { useReducer, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, Task, AppSettings, Statistics, GoalCategory, GoalPriority, TaskStatus, TaskPriority } from '@/lib/types';

const STORAGE_KEY = 'study_planner_data';
const SETTINGS_KEY = 'study_planner_settings';

interface StudyDataState {
  goals: Goal[];
  settings: AppSettings;
  loading: boolean;
  error: string | null;
}

type StudyDataAction =
  | { type: 'SET_GOALS'; payload: Goal[] }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: Goal }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'ADD_TASK'; payload: { goalId: string; task: Task } }
  | { type: 'UPDATE_TASK'; payload: { goalId: string; task: Task } }
  | { type: 'DELETE_TASK'; payload: { goalId: string; taskId: string } }
  | { type: 'SET_SETTINGS'; payload: AppSettings }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialSettings: AppSettings = {
  userName: 'المستخدم',
  notificationsEnabled: true,
  notificationTime: '09:00',
  theme: 'auto',
  language: 'ar',
};

function studyDataReducer(state: StudyDataState, action: StudyDataAction): StudyDataState {
  switch (action.type) {
    case 'SET_GOALS':
      return { ...state, goals: action.payload };

    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.payload] };

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) => (goal.id === action.payload.id ? action.payload : goal)),
      };

    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload),
      };

    case 'ADD_TASK':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.goalId
            ? { ...goal, tasks: [...goal.tasks, action.payload.task] }
            : goal
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.goalId
            ? {
                ...goal,
                tasks: goal.tasks.map((task) =>
                  task.id === action.payload.task.id ? action.payload.task : task
                ),
              }
            : goal
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.goalId
            ? { ...goal, tasks: goal.tasks.filter((task) => task.id !== action.payload.taskId) }
            : goal
        ),
      };

    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export function useStudyData() {
  const [state, dispatch] = useReducer(studyDataReducer, {
    goals: [],
    settings: initialSettings,
    loading: true,
    error: null,
  });

  // تحميل البيانات من التخزين المحلي عند بدء التطبيق
  useEffect(() => {
    loadData();
  }, []);

  // حفظ البيانات عند تغييرها
  useEffect(() => {
    if (!state.loading) {
      saveData();
    }
  }, [state.goals, state.settings]);

  const loadData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const [goalsData, settingsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SETTINGS_KEY),
      ]);

      if (goalsData) {
        dispatch({ type: 'SET_GOALS', payload: JSON.parse(goalsData) });
      }

      if (settingsData) {
        dispatch({ type: 'SET_SETTINGS', payload: JSON.parse(settingsData) });
      }

      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'خطأ في تحميل البيانات' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveData = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.goals)),
        AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)),
      ]);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'خطأ في حفظ البيانات' });
    }
  };

  const addGoal = useCallback(
    (title: string, description: string, category: GoalCategory, priority: GoalPriority, dueDate: string) => {
      const newGoal: Goal = {
        id: Date.now().toString(),
        title,
        description,
        category,
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
      };
      dispatch({ type: 'ADD_GOAL', payload: newGoal });
      return newGoal;
    },
    []
  );

  const updateGoal = useCallback((goal: Goal) => {
    dispatch({ type: 'UPDATE_GOAL', payload: { ...goal, updatedAt: new Date().toISOString() } });
  }, []);

  const deleteGoal = useCallback((goalId: string) => {
    dispatch({ type: 'DELETE_GOAL', payload: goalId });
  }, []);

  const addTask = useCallback(
    (goalId: string, title: string, description: string | undefined, priority: TaskPriority, dueDate: string) => {
      const newTask: Task = {
        id: Date.now().toString(),
        goalId,
        title,
        description,
        status: 'pending',
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_TASK', payload: { goalId, task: newTask } });
      return newTask;
    },
    []
  );

  const updateTask = useCallback((goalId: string, task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: { goalId, task: { ...task, updatedAt: new Date().toISOString() } } });
  }, []);

  const deleteTask = useCallback((goalId: string, taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { goalId, taskId } });
  }, []);

  const updateSettings = useCallback((settings: AppSettings) => {
    dispatch({ type: 'SET_SETTINGS', payload: settings });
  }, []);

  const calculateStatistics = useCallback((): Statistics => {
    const totalGoals = state.goals.length;
    const completedGoals = state.goals.filter((g) => g.tasks.every((t) => t.status === 'completed')).length;
    const activeGoals = totalGoals - completedGoals;

    const now = new Date();
    const overdueGoals = state.goals.filter((g) => new Date(g.dueDate) < now && g.tasks.some((t) => t.status !== 'completed')).length;

    const allTasks = state.goals.flatMap((g) => g.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((t) => t.status === 'completed').length;
    const pendingTasks = allTasks.filter((t) => t.status === 'pending').length;
    const inProgressTasks = allTasks.filter((t) => t.status === 'in_progress').length;
    const overdueTasks = allTasks.filter((t) => new Date(t.dueDate) < now && t.status !== 'completed').length;

    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // حساب التقدم الأسبوعي
    const weeklyProgress: Record<string, { completed: number; total: number }> = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weeklyProgress[dateStr] = { completed: 0, total: 0 };
    }

    allTasks.forEach((task) => {
      const taskDate = task.updatedAt.split('T')[0];
      if (weeklyProgress[taskDate]) {
        weeklyProgress[taskDate].total++;
        if (task.status === 'completed') {
          weeklyProgress[taskDate].completed++;
        }
      }
    });

    const weeklyProgressArray = Object.entries(weeklyProgress)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, { completed, total }]) => ({ date, tasksCompleted: completed, tasksTotal: total }));

    return {
      totalGoals,
      completedGoals,
      activeGoals,
      overdueGoals,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      overallProgress,
      weeklyProgress: weeklyProgressArray,
    };
  }, [state.goals]);

  return {
    state,
    addGoal,
    updateGoal,
    deleteGoal,
    addTask,
    updateTask,
    deleteTask,
    updateSettings,
    calculateStatistics,
    loadData,
  };
}
