# Expo Calendar App with Bun

## 環境構築

### 1. 前提条件
- Node.js がインストールされていること
- bun がインストールされていること

### 2. プロジェクトの作成

```bash
# bunを使用してExpoプロジェクトを作成
bunx create-expo-app expo-calendar -t expo-template-blank-typescript

# 必要なパッケージのインストール
bun add react-native-calendars
```

## 日本時間対応

### 実装のポイント

```typescript
// 日本時間で現在の日付を取得
const now = new Date();
const japanTime = now.getTime() + (9 * 60 * 60 * 1000); // UTC+9の調整
const today = new Date(japanTime);
const currentDate = today.toISOString().slice(0, 10); // YYYY-MM-DD形式

// 日付フォーマット関数
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
};
```

### 主な特徴
- UTCからの時差計算による安定した日本時間の取得
- カスタムフォーマット関数による確実な日本語表示
- 日付の範囲エラー対策

## SafeArea 対応

### 1. コンポーネントのインポート
```typescript
import { SafeAreaView } from 'react-native';
```

### 2. 実装方法
```typescript
const CalendarComponent = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* カレンダーコンテンツ */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF'  // SafeArea背景色
    },
    container: {
        flex: 1,
        padding: 20,
    }
});
```

### 主な特徴
- iPhoneのノッチ部分への対応
- 適切な余白の確保
- 背景色の統一

## カレンダーのカスタマイズ

### 1. 日本語表示
```typescript
monthNames={['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']}
dayNames={['日', '月', '火', '水', '木', '金', '土']}
```

### 2. 曜日の色分け
```typescript
theme={{
    'stylesheet.calendar.header': {
        dayTextAtIndex0: {
            color: '#FF0000'  // 日曜日
        },
        dayTextAtIndex6: {
            color: '#0000FF'  // 土曜日
        }
    }
}}
```

## 今後の改善点

1. **パフォーマンス最適化**
   - メモ化によるレンダリング最適化
   - 不要な再レンダリングの防止

2. **機能拡張**
   - 祝日表示機能
   - イベント登録機能
   - 複数日選択機能

3. **UI/UX改善**
   - ダークモード対応
   - アニメーション追加
   - アクセシビリティ対応

## トラブルシューティング

### よくある問題と解決方法

1. **日付の範囲エラー**
   - 原因: タイムゾーン設定の問題
   - 解決: 適切なUTC+9の時差調整を実装

2. **SafeAreaの表示問題**
   - 原因: スタイリングの不適切な設定
   - 解決: 適切なflex設定とbackgroundColorの指定