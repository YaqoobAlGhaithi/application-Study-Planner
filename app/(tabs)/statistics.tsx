import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { Statistics } from '@/lib/types';

export default function StatisticsScreen() {
  const colors = useColors();
  const { calculateStatistics } = useStudy();
  const [stats, setStats] = useState<Statistics>(calculateStatistics());

  useEffect(() => {
    setStats(calculateStatistics());
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* العنوان */}
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.foreground, marginBottom: 24 }}>
          الإحصائيات
        </Text>

        {/* بطاقات الملخص الرئيسية */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            ملخص سريع
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                إجمالي الأهداف
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.primary }}>
                {stats.totalGoals}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                الأهداف المكتملة
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.success }}>
                {stats.completedGoals}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                الأهداف النشطة
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.primary }}>
                {stats.activeGoals}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 8 }}>
                الأهداف المتأخرة
              </Text>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.error }}>
                {stats.overdueGoals}
              </Text>
            </View>
          </View>
        </View>

        {/* إحصائيات المهام */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            إحصائيات المهام
          </Text>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 12,
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: colors.foreground, fontWeight: '500' }}>
                  إجمالي المهام
                </Text>
                <Text style={{ fontSize: 13, color: colors.foreground, fontWeight: '600' }}>
                  {stats.totalTasks}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: colors.success, fontWeight: '500' }}>
                  المهام المكتملة
                </Text>
                <Text style={{ fontSize: 13, color: colors.success, fontWeight: '600' }}>
                  {stats.completedTasks}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: colors.warning, fontWeight: '500' }}>
                  المهام قيد التنفيذ
                </Text>
                <Text style={{ fontSize: 13, color: colors.warning, fontWeight: '600' }}>
                  {stats.inProgressTasks}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: colors.muted, fontWeight: '500' }}>
                  المهام المعلقة
                </Text>
                <Text style={{ fontSize: 13, color: colors.muted, fontWeight: '600' }}>
                  {stats.pendingTasks}
                </Text>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 13, color: colors.error, fontWeight: '500' }}>
                  المهام المتأخرة
                </Text>
                <Text style={{ fontSize: 13, color: colors.error, fontWeight: '600' }}>
                  {stats.overdueTasks}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* التقدم الكلي */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            التقدم الكلي
          </Text>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: colors.background,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 8,
                  borderColor: colors.primary,
                }}
              >
                <Text style={{ fontSize: 32, fontWeight: '700', color: colors.primary }}>
                  {stats.overallProgress}%
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 13, color: colors.muted, textAlign: 'center' }}>
              لقد أكملت {stats.completedTasks} من {stats.totalTasks} مهمة
            </Text>
          </View>
        </View>

        {/* التقدم الأسبوعي */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            التقدم الأسبوعي
          </Text>

          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {stats.weeklyProgress.length > 0 ? (
              <View>
                {stats.weeklyProgress.map((day, index) => (
                  <View key={index} style={{ marginBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ fontSize: 12, color: colors.muted }}>
                        {new Date(day.date).toLocaleDateString('ar-SA')}
                      </Text>
                      <Text style={{ fontSize: 12, color: colors.foreground, fontWeight: '600' }}>
                        {day.tasksCompleted}/{day.tasksTotal}
                      </Text>
                    </View>
                    <View style={{ height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' }}>
                      <View
                        style={{
                          height: '100%',
                          width: day.tasksTotal > 0 ? `${(day.tasksCompleted / day.tasksTotal) * 100}%` : '0%',
                          backgroundColor: colors.success,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ fontSize: 13, color: colors.muted, textAlign: 'center' }}>
                لا توجد بيانات متاحة
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
