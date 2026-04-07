import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { Goal, Task } from '@/lib/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalDetailsScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const { goals, updateTask, deleteTask, deleteGoal } = useStudy();

  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const foundGoal = goals.find((g) => g.id === id);
    if (foundGoal) {
      setGoal(foundGoal);
    }
  }, [id, goals]);

  if (!goal) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  const completedTasks = goal.tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = goal.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleToggleTask = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTask(goal.id, { ...task, status: newStatus });
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert('حذف المهمة', 'هل أنت متأكد من حذف هذه المهمة؟', [
      { text: 'إلغاء', onPress: () => {} },
      {
        text: 'حذف',
        onPress: () => deleteTask(goal.id, taskId),
        style: 'destructive',
      },
    ]);
  };

  const handleDeleteGoal = () => {
    Alert.alert('حذف الهدف', 'هل أنت متأكد من حذف هذا الهدف؟', [
      { text: 'إلغاء', onPress: () => {} },
      {
        text: 'حذف',
        onPress: () => {
          deleteGoal(goal.id);
          router.back();
        },
        style: 'destructive',
      },
    ]);
  };

  const handleAddTask = () => {
    router.push(`/add-task/${goal.id}`);
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <FlatList
        data={goal.tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        ListHeaderComponent={
          <View>
            {/* رأس الشاشة */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
              </Pressable>
              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginLeft: 12, flex: 1 }}>
                تفاصيل الهدف
              </Text>
              <Pressable
                onPress={handleDeleteGoal}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <MaterialIcons name="delete" size={24} color={colors.error} />
              </Pressable>
            </View>

            {/* معلومات الهدف */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.foreground, marginBottom: 8 }}>
                {goal.title}
              </Text>
              <Text style={{ fontSize: 14, color: colors.muted, marginBottom: 12, lineHeight: 20 }}>
                {goal.description}
              </Text>

              {/* شريط التقدم */}
              <View style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.foreground }}>
                    التقدم
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>
                    {progressPercentage}%
                  </Text>
                </View>
                <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' }}>
                  <View
                    style={{
                      height: '100%',
                      width: `${progressPercentage}%`,
                      backgroundColor: colors.success,
                    }}
                  />
                </View>
              </View>

              {/* معلومات إضافية */}
              <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 8,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                    الفئة
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.foreground }}>
                    {goal.category}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 8,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                    الأولوية
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                      color:
                        goal.priority === 'high'
                          ? colors.error
                          : goal.priority === 'medium'
                            ? colors.warning
                            : colors.success,
                    }}
                  >
                    {goal.priority === 'high' ? 'عالية' : goal.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.surface,
                    borderRadius: 8,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 11, color: colors.muted, marginBottom: 4 }}>
                    الانتهاء
                  </Text>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.foreground }}>
                    {new Date(goal.dueDate).toLocaleDateString('ar-SA')}
                  </Text>
                </View>
              </View>
            </View>

            {/* عنوان المهام */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground }}>
                المهام ({completedTasks}/{totalTasks})
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Pressable
              onPress={() => handleToggleTask(item)}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: item.status === 'completed' ? colors.success : colors.surface,
                borderWidth: 2,
                borderColor: item.status === 'completed' ? colors.success : colors.border,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.status === 'completed' && (
                <MaterialIcons name="check" size={16} color={colors.background} />
              )}
            </Pressable>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: colors.foreground,
                  textDecorationLine: item.status === 'completed' ? 'line-through' : 'none',
                  marginBottom: 4,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>
                {new Date(item.dueDate).toLocaleDateString('ar-SA')}
              </Text>
            </View>

            <Pressable
              onPress={() => handleDeleteTask(item.id)}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <MaterialIcons name="close" size={20} color={colors.error} />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 32 }}>
            <MaterialIcons name="task-alt" size={40} color={colors.muted} />
            <Text style={{ fontSize: 14, color: colors.muted, marginTop: 12, textAlign: 'center' }}>
              لا توجد مهام حالياً
            </Text>
          </View>
        }
      />

      {/* زر عائم لإضافة مهمة */}
      <Pressable
        onPress={handleAddTask}
        style={({ pressed }) => [
          {
            position: 'absolute',
            bottom: 24,
            right: 16,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        <MaterialIcons name="add" size={28} color={colors.background} />
      </Pressable>
    </ScreenContainer>
  );
}
