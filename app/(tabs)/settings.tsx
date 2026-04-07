import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Switch, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useStudy } from '@/lib/study-context';
import { useColors } from '@/hooks/use-colors';
import { AppSettings } from '@/lib/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const colors = useColors();
  const { settings, updateSettings } = useStudy();

  const [userName, setUserName] = useState(settings.userName);
  const [userEmail, setUserEmail] = useState(settings.userEmail || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings.notificationsEnabled);
  const [notificationTime, setNotificationTime] = useState(settings.notificationTime);
  const [theme, setTheme] = useState(settings.theme);

  const handleSaveSettings = () => {
    const updatedSettings: AppSettings = {
      userName,
      userEmail: userEmail || undefined,
      notificationsEnabled,
      notificationTime,
      theme,
      language: settings.language,
    };

    updateSettings(updatedSettings);
    Alert.alert('نجح', 'تم حفظ الإعدادات بنجاح');
  };

  const handleClearData = () => {
    Alert.alert(
      'حذف جميع البيانات',
      'هل أنت متأكد؟ هذا الإجراء لا يمكن التراجع عنه.',
      [
        { text: 'إلغاء', onPress: () => {} },
        {
          text: 'حذف',
          onPress: () => {
            // سيتم تنفيذ هذا في المستقبل
            Alert.alert('تم', 'تم حذف جميع البيانات');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* العنوان */}
        <Text style={{ fontSize: 24, fontWeight: '700', color: colors.foreground, marginBottom: 24 }}>
          الإعدادات
        </Text>

        {/* قسم الحساب */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            الحساب
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
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 6 }}>
                اسم المستخدم
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: colors.foreground,
                }}
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            <View>
              <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 6 }}>
                البريد الإلكتروني (اختياري)
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: colors.foreground,
                }}
                value={userEmail}
                onChangeText={setUserEmail}
                placeholder="example@email.com"
                placeholderTextColor={colors.muted}
              />
            </View>
          </View>
        </View>

        {/* قسم الإشعارات */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            الإشعارات
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 13, color: colors.foreground, fontWeight: '500' }}>
                تفعيل الإشعارات
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.success }}
                thumbColor={notificationsEnabled ? colors.success : colors.muted}
              />
            </View>

            {notificationsEnabled && (
              <View>
                <Text style={{ fontSize: 12, color: colors.muted, marginBottom: 6 }}>
                  وقت الإشعار الافتراضي
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 14,
                    color: colors.foreground,
                  }}
                  value={notificationTime}
                  onChangeText={setNotificationTime}
                  placeholder="HH:mm"
                />
              </View>
            )}
          </View>
        </View>

        {/* قسم المظهر */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            المظهر
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
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {['light', 'dark', 'auto'].map((themeOption) => (
                <Pressable
                  key={themeOption}
                  onPress={() => setTheme(themeOption as 'light' | 'dark' | 'auto')}
                  style={({pressed}) => [
                    {
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 8,
                      backgroundColor:
                        theme === themeOption ? colors.primary : colors.background,
                      borderWidth: 1,
                      borderColor:
                        theme === themeOption ? colors.primary : colors.border,
                      alignItems: 'center',
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color:
                        theme === themeOption ? colors.background : colors.foreground,
                    }}
                  >
                    {themeOption === 'light'
                      ? 'فاتح'
                      : themeOption === 'dark'
                        ? 'داكن'
                        : 'تلقائي'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* قسم البيانات */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            البيانات
          </Text>

          <Pressable
            onPress={handleClearData}
            style={({pressed}) => [
              {
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: colors.error,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: colors.error, fontWeight: '500' }}>
                حذف جميع البيانات
              </Text>
              <MaterialIcons name="delete" size={20} color={colors.error} />
            </View>
          </Pressable>
        </View>

        {/* قسم المساعدة */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
            المساعدة
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
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 12, color: colors.muted }}>
                الإصدار
              </Text>
              <Text style={{ fontSize: 14, color: colors.foreground, fontWeight: '600', marginTop: 4 }}>
                1.0.0
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 12, color: colors.muted }}>
                التطبيق
              </Text>
              <Text style={{ fontSize: 14, color: colors.foreground, fontWeight: '600', marginTop: 4 }}>
                Study Planner
              </Text>
            </View>
          </View>
        </View>

        {/* زر حفظ الإعدادات */}
        <Pressable
          onPress={handleSaveSettings}
          style={({pressed}) => [
            {
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: colors.primary,
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
              marginBottom: 16,
            },
          ]}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.background }}>
            حفظ الإعدادات
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
