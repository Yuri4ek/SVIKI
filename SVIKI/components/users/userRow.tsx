import {
  View,
  Text,
} from "react-native";

// Строка таблицы пользователей
export const UserRow = ({ item, isLast, styles, showProgress }: any) => (
  <View style={[styles.userRow, isLast && styles.lastRow]}>
    <View style={styles.userInfoGrid}>
      <Text style={styles.userId}>ID: {item.id}</Text>
      <Text style={styles.userName}>{item.email}</Text>
    </View>
    <View style={styles.userInfoGrid}>
      <Text style={styles.userSubInfo}>{item.name}</Text>
      <Text style={styles.userSubInfo}>{item.phone}</Text>
    </View>

    {showProgress && (
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
      </View>
    )}
  </View>
);