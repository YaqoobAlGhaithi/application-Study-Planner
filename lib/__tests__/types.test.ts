import { describe, it, expect } from 'vitest';
import { Goal, Task, Statistics, AppSettings } from '@/lib/types';

describe('Study Planner Types', () => {
  describe('Goal type', () => {
    it('should create a valid goal object', () => {
      const goal: Goal = {
        id: '1',
        title: 'تعلم اللغة الإنجليزية',
        description: 'تحسين مهارات اللغة الإنجليزية',
        category: 'languages',
        priority: 'high',
        dueDate: '2026-05-07',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
      };

      expect(goal.id).toBe('1');
      expect(goal.title).toBe('تعلم اللغة الإنجليزية');
      expect(goal.category).toBe('languages');
      expect(goal.priority).toBe('high');
      expect(goal.tasks).toEqual([]);
    });

    it('should support all goal categories', () => {
      const categories: Goal['category'][] = ['languages', 'programming', 'math', 'science', 'other'];
      
      categories.forEach((cat) => {
        expect(['languages', 'programming', 'math', 'science', 'other']).toContain(cat);
      });
    });

    it('should support all goal priorities', () => {
      const priorities: Goal['priority'][] = ['high', 'medium', 'low'];
      
      priorities.forEach((pri) => {
        expect(['high', 'medium', 'low']).toContain(pri);
      });
    });
  });

  describe('Task type', () => {
    it('should create a valid task object', () => {
      const task: Task = {
        id: '1',
        goalId: 'goal-1',
        title: 'قراءة الفصل الأول',
        description: 'قراءة الفصل الأول من الكتاب',
        status: 'pending',
        priority: 'high',
        dueDate: '2026-04-10',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      expect(task.id).toBe('1');
      expect(task.goalId).toBe('goal-1');
      expect(task.title).toBe('قراءة الفصل الأول');
      expect(task.status).toBe('pending');
    });

    it('should support all task statuses', () => {
      const statuses: Task['status'][] = ['pending', 'in_progress', 'completed'];
      
      statuses.forEach((status) => {
        expect(['pending', 'in_progress', 'completed']).toContain(status);
      });
    });

    it('should support all task priorities', () => {
      const priorities: Task['priority'][] = ['high', 'medium', 'low'];
      
      priorities.forEach((pri) => {
        expect(['high', 'medium', 'low']).toContain(pri);
      });
    });
  });

  describe('Statistics type', () => {
    it('should create a valid statistics object', () => {
      const stats: Statistics = {
        totalGoals: 5,
        completedGoals: 2,
        activeGoals: 3,
        overdueGoals: 1,
        totalTasks: 20,
        completedTasks: 10,
        pendingTasks: 8,
        inProgressTasks: 2,
        overdueTasks: 1,
        overallProgress: 50,
        weeklyProgress: [
          { date: '2026-04-07', tasksCompleted: 2, tasksTotal: 5 },
          { date: '2026-04-06', tasksCompleted: 1, tasksTotal: 3 },
        ],
      };

      expect(stats.totalGoals).toBe(5);
      expect(stats.completedGoals).toBe(2);
      expect(stats.overallProgress).toBe(50);
      expect(stats.weeklyProgress.length).toBe(2);
    });

    it('should calculate progress percentage correctly', () => {
      const stats: Statistics = {
        totalGoals: 10,
        completedGoals: 5,
        activeGoals: 5,
        overdueGoals: 0,
        totalTasks: 100,
        completedTasks: 75,
        pendingTasks: 20,
        inProgressTasks: 5,
        overdueTasks: 0,
        overallProgress: 75,
        weeklyProgress: [],
      };

      expect(stats.overallProgress).toBe(75);
    });
  });

  describe('AppSettings type', () => {
    it('should create valid app settings', () => {
      const settings: AppSettings = {
        userName: 'أحمد',
        userEmail: 'ahmed@example.com',
        notificationsEnabled: true,
        notificationTime: '09:00',
        theme: 'auto',
        language: 'ar',
      };

      expect(settings.userName).toBe('أحمد');
      expect(settings.notificationsEnabled).toBe(true);
      expect(settings.theme).toBe('auto');
      expect(settings.language).toBe('ar');
    });

    it('should support all theme options', () => {
      const themes: AppSettings['theme'][] = ['light', 'dark', 'auto'];
      
      themes.forEach((theme) => {
        expect(['light', 'dark', 'auto']).toContain(theme);
      });
    });
  });
});
