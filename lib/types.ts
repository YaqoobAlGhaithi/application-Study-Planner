/**
 * أنواع البيانات الأساسية لتطبيق التخطيط الدراسي
 */

export type GoalCategory = 'languages' | 'programming' | 'math' | 'science' | 'other';
export type GoalPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'high' | 'medium' | 'low';

/**
 * نموذج الهدف التعليمي
 */
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  dueDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

/**
 * نموذج المهمة الفرعية
 */
export interface Task {
  id: string;
  goalId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

/**
 * إحصائيات التقدم
 */
export interface Statistics {
  totalGoals: number;
  completedGoals: number;
  activeGoals: number;
  overdueGoals: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  overallProgress: number; // 0-100
  weeklyProgress: DailyProgress[];
}

/**
 * التقدم اليومي
 */
export interface DailyProgress {
  date: string; // ISO date string
  tasksCompleted: number;
  tasksTotal: number;
}

/**
 * إعدادات التطبيق
 */
export interface AppSettings {
  userName: string;
  userEmail?: string;
  notificationsEnabled: boolean;
  notificationTime: string; // HH:mm format
  theme: 'light' | 'dark' | 'auto';
  language: 'ar' | 'en';
}

/**
 * حالة التطبيق
 */
export interface AppState {
  goals: Goal[];
  settings: AppSettings;
  statistics: Statistics;
  loading: boolean;
  error: string | null;
}
