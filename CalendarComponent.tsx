import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
    // 日本時間で現在の日付を取得（修正版）
    const now = new Date();
    const japanTime = now.getTime() + (9 * 60 * 60 * 1000); // UTC+9の調整
    const today = new Date(japanTime);
    const currentDate = today.toISOString().slice(0, 10); // YYYY-MM-DD形式

    // 選択された日付の状態管理
    const [selected, setSelected] = useState(currentDate);

    // 日付をフォーマットする関数
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.currentDate}>
                    現在の日付: {formatDate(today)}
                </Text>

                <Calendar
                    current={currentDate}
                    onDayPress={(day: { dateString: string }) => {
                        setSelected(day.dateString);
                    }}
                    onMonthChange={(month: {
                        dateString: string,
                        day: number,
                        month: number,
                        year: number,
                        timestamp: number
                    }) => {
                        console.log('月が変更されました:', month);
                    }}
                    markedDates={{
                        [selected]: {
                            selected: true,
                            selectedColor: '#0066CC',
                        },
                        [currentDate]: {
                            marked: true,
                            dotColor: '#FF0000',
                        }
                    }}
                    theme={{
                        todayTextColor: '#FF0000',
                        selectedDayBackgroundColor: '#0066CC',
                        arrowColor: '#0066CC',
                        monthTextColor: '#000000',
                        textMonthFontSize: 16,
                        textDayFontSize: 14,
                        'stylesheet.calendar.header': {
                            dayTextAtIndex0: {
                                color: '#FF0000'  // 日曜日の色
                            },
                            dayTextAtIndex6: {
                                color: '#0000FF'  // 土曜日の色
                            }
                        }
                    }}
                    monthNames={['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']}
                    dayNames={['日', '月', '火', '水', '木', '金', '土']}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    container: {
        flex: 1,
        padding: 20,
    },
    currentDate: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default CalendarComponent;