import { ScrollView, Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { GoalCard } from '@/components/goal-card';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { goals, settings, loading, calculateStatistics } = useStudy();
  const [stats, setStats] = useState(calculateStatistics());

  useEffect(() => {
    setStats(calculateStatistics());
  }, [goals]);

  if (loading) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  const handleAddGoal = () => {
    router.push('/add-goal');
  };

  const handleGoalPress = (goalId: string) => {
    router.push(`/goal-details/${goalId}`);
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        ListHeaderComponent={
          <View>
            {/* رسالة الترحيب والإحصائيات */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.foreground, marginBottom: 8 }}>
                مرحباً، {settings.userName}
              </Text>
              <Text style={{ fontSize: 14, color: colors.muted }}>
                تابع تقدمك الدراسي اليوم
              </Text>
            </View>

            {/* بطاقات الإحصائيات */}
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>
                  الأهداف النشطة
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>
                  {stats.activeGoals}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>
                  المهام المكتملة
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '700', color: colors.success }}>
                  {stats.completedTasks}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 4 }}>
                  التقدم الكلي
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '700', color: colors.primary }}>
                  {stats.overallProgress}%
                </Text>
              </View>
            </View>

            {/* عنوان الأهداف */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
              أهدافك الحالية
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <GoalCard goal={item} onPress={() => handleGoalPress(item.id)} />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
            <MaterialIcons name="assignment" size={48} color={colors.muted} />
            <Text style={{ fontSize: 16, color: colors.muted, marginTop: 12, textAlign: 'center' }}>
              لا توجد أهداف حالياً
            </Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4, textAlign: 'center' }}>
              ابدأ بإضافة هدف جديد لتتبع تقدمك
            </Text>
          </View>
        }
        scrollEnabled={true}
      />

      {/* زر عائم لإضافة هدف جديد */}
      <Pressable
        onPress={handleAddGoal}
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
