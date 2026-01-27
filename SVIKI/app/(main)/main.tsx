import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { createMainStyles } from '@/styles';

const MainPage = () => {
  const theme = useColorScheme() ?? 'light';
  const styles = createMainStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SVIKI</Text>
    </View>
  );
};

export default MainPage;