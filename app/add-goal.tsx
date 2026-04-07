import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { GoalCategory, GoalPriority } from '@/lib/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AddGoalScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addGoal } = useStudy();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('other');
  const [priority, setPriority] = useState<GoalPriority>('medium');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const categories: { label: string; value: GoalCategory }[] = [
    { label: 'لغات', value: 'languages' },
    { label: 'برمجة', value: 'programming' },
    { label: 'رياضيات', value: 'math' },
    { label: 'علوم', value: 'science' },
    { label: 'أخرى', value: 'other' },
  ];

  const priorities: { label: string; value: GoalPriority }[] = [
    { label: 'عالية', value: 'high' },
    { label: 'متوسطة', value: 'medium' },
    { label: 'منخفضة', value: 'low' },
  ];

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال اسم الهدف');
      return;
    }

    if (!description.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال وصف الهدف');
      return;
    }

    addGoal(title, description, category, priority, dueDate);
    router.back();
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
            إضافة هدف جديد
          </Text>
        </View>

        {/* حقل الاسم */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            اسم الهدف
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
            placeholder="مثال: تعلم اللغة الإنجليزية"
            placeholderTextColor={colors.muted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* حقل الوصف */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            الوصف
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
              minHeight: 100,
              textAlignVertical: 'top',
            }}
            placeholder="اكتب وصفاً مفصلاً للهدف..."
            placeholderTextColor={colors.muted}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* اختيار الفئة */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            الفئة
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((cat) => (
              <Pressable
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                style={({pressed}) => [
                  {
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: category === cat.value ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: category === cat.value ? colors.primary : colors.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: category === cat.value ? colors.background : colors.foreground,
                  }}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>
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

        {/* اختيار تاريخ الانتهاء */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 8 }}>
            تاريخ الانتهاء المتوقع
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
              حفظ الهدف
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
