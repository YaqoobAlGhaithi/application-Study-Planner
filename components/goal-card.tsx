import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Goal } from '@/lib/types';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const colors = useColors();

  const completedTasks = goal.tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = goal.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      languages: colors.category_languages,
      programming: colors.category_programming,
      math: colors.category_math,
      science: colors.category_science,
    };
    return categoryColors[category] || colors.primary;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة',
    };
    return labels[priority] || priority;
  };

  const isOverdue = new Date(goal.dueDate) < new Date() && completedTasks < totalTasks;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={2}>
            {goal.title}
          </Text>
          <Text style={[styles.category, { color: getCategoryColor(goal.category) }]}>
            {goal.category}
          </Text>
        </View>
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                goal.priority === 'high'
                  ? colors.error
                  : goal.priority === 'medium'
                    ? colors.warning
                    : colors.success,
            },
          ]}
        >
          <Text style={[styles.priorityText, { color: colors.background }]}>
            {getPriorityLabel(goal.priority)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: isOverdue ? colors.error : colors.success,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.muted }]}>
          {completedTasks}/{totalTasks}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.dueDate, { color: isOverdue ? colors.error : colors.muted }]}>
          {new Date(goal.dueDate).toLocaleDateString('ar-SA')}
        </Text>
        {isOverdue && (
          <Text style={[styles.overdueLabel, { color: colors.error }]}>متأخر</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
  },
  overdueLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
