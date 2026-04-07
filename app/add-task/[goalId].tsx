import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { TaskPriority } from '@/lib/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AddTaskScreen() {
  const router = useRouter();
  const colors = useColors();
  const { goalId } = useLocalSearchParams();
  const { addTask } = useStudy();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const priorities: { label: string; value: TaskPriority }[] = [
    { label: 'عالية', value: 'high' },
    { label: 'متوسطة', value: 'medium' },
    { label: 'منخفضة', value: 'low' },
  ];

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال اسم المهمة');
      return;
    }

    if (typeof goalId === 'string') {
      addTask(goalId, title, description, priority, dueDate);
      router.back();
    }
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* رأس الشاشة */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.foreground} />
          </Pressable>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginLeft: 12 }}>
            إضافة مهمة جديدة
          </Text>
        </View>

        {/* حقل الاسم */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            اسم المهمة
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: colors.foreground,
            }}
            placeholder="مثال: قراءة الفصل الأول"
            placeholderTextColor={colors.muted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* حقل الوصف */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            الوصف (اختياري)
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: colors.foreground,
              minHeight: 80,
              textAlignVertical: 'top',
            }}
            placeholder="أضف تفاصيل إضافية عن المهمة..."
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* اختيار الأولوية */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            الأولوية
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {priorities.map((pri) => (
              <Pressable
                key={pri.value}
                onPress={() => setPriority(pri.value)}
                style={({pressed}) => [
                  {
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor:
                      priority === pri.value
                        ? pri.value === 'high'
                          ? colors.error
                          : pri.value === 'medium'
                            ? colors.warning
                            : colors.success
                        : colors.surface,
                    borderWidth: 1,
                    borderColor:
                      priority === pri.value
                        ? pri.value === 'high'
                          ? colors.error
                          : pri.value === 'medium'
                            ? colors.warning
                            : colors.success
                        : colors.border,
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: priority === pri.value ? colors.background : colors.foreground,
                  }}
                >
                  {pri.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* اختيار تاريخ الاستحقاق */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            تاريخ الاستحقاق
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: colors.foreground,
            }}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.muted}
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>

        {/* أزرار الحفظ والإلغاء */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable
            onPress={() => router.back()}
            style={({pressed}) => [
              {
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: 'center',
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>
              إلغاء
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSave}
            style={({pressed}) => [
              {
                flex: 1,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: colors.primary,
                alignItems: 'center',
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.background }}>
              حفظ المهمة
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
