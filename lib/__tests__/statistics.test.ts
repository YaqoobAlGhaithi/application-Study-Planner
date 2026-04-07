import { describe, it, expect } from 'vitest';
import { Goal, Task } from '@/lib/types';

describe('Statistics Calculations', () => {
  describe('Goal completion calculation', () => {
    it('should calculate completed goals correctly', () => {
      const goals: Goal[] = [
        {
          id: '1',
          title: 'Goal 1',
          description: 'Description 1',
          category: 'languages',
          priority: 'high',
          dueDate: '2026-05-07',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [
            {
              id: 't1',
              goalId: '1',
              title: 'Task 1',
              status: 'completed',
              priority: 'high',
              dueDate: '2026-04-10',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        },
        {
          id: '2',
          title: 'Goal 2',
          description: 'Description 2',
          category: 'programming',
          priority: 'medium',
          dueDate: '2026-05-07',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [
            {
              id: 't2',
              goalId: '2',
              title: 'Task 2',
              status: 'pending',
              priority: 'high',
              dueDate: '2026-04-10',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        },
      ];

      const completedGoals = goals.filter((g) => g.tasks.every((t) => t.status === 'completed')).length;
      expect(completedGoals).toBe(1);
    });
  });

  describe('Task progress calculation', () => {
    it('should calculate overall progress percentage', () => {
      const allTasks: Task[] = [
        {
          id: 't1',
          goalId: '1',
          title: 'Task 1',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't2',
          goalId: '1',
          title: 'Task 2',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't3',
          goalId: '1',
          title: 'Task 3',
          status: 'pending',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't4',
          goalId: '1',
          title: 'Task 4',
          status: 'pending',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const completedTasks = allTasks.filter((t) => t.status === 'completed').length;
      const totalTasks = allTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      expect(completedTasks).toBe(2);
      expect(totalTasks).toBe(4);
      expect(progress).toBe(50);
    });

    it('should return 0 progress when no tasks exist', () => {
      const allTasks: Task[] = [];
      const completedTasks = allTasks.filter((t) => t.status === 'completed').length;
      const totalTasks = allTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      expect(progress).toBe(0);
    });

    it('should return 100 progress when all tasks are completed', () => {
      const allTasks: Task[] = [
        {
          id: 't1',
          goalId: '1',
          title: 'Task 1',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't2',
          goalId: '1',
          title: 'Task 2',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const completedTasks = allTasks.filter((t) => t.status === 'completed').length;
      const totalTasks = allTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      expect(progress).toBe(100);
    });
  });

  describe('Overdue task detection', () => {
    it('should identify overdue tasks', () => {
      const now = new Date();
      const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const tasks: Task[] = [
        {
          id: 't1',
          goalId: '1',
          title: 'Overdue Task',
          status: 'pending',
          priority: 'high',
          dueDate: pastDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't2',
          goalId: '1',
          title: 'Future Task',
          status: 'pending',
          priority: 'high',
          dueDate: futureDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const overdueTasks = tasks.filter((t) => new Date(t.dueDate) < now && t.status !== 'completed');
      expect(overdueTasks.length).toBe(1);
      expect(overdueTasks[0].id).toBe('t1');
    });
  });

  describe('Task status counts', () => {
    it('should count tasks by status', () => {
      const tasks: Task[] = [
        {
          id: 't1',
          goalId: '1',
          title: 'Task 1',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't2',
          goalId: '1',
          title: 'Task 2',
          status: 'in_progress',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 't3',
          goalId: '1',
          title: 'Task 3',
          status: 'pending',
          priority: 'high',
          dueDate: '2026-04-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const completedCount = tasks.filter((t) => t.status === 'completed').length;
      const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
      const pendingCount = tasks.filter((t) => t.status === 'pending').length;

      expect(completedCount).toBe(1);
      expect(inProgressCount).toBe(1);
      expect(pendingCount).toBe(1);
    });
  });
});
