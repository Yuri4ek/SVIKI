import React from "react";
import { View, useColorScheme } from "react-native";
import { createMainStyles } from "@/styles";
import { RoleGuard } from "@/components";
import { ClientDashboard } from "@/components/dashboards";
// import { AdminMain } from "@/components/dashboards/AdminMain"; // В будущем

const MainPage = () => {
  const theme = useColorScheme() ?? "light";
  const styles = createMainStyles(theme);

  return (
    <View style={styles.container}>
      <RoleGuard 
        client={<ClientDashboard />} 
        // Агент и Юрист пока без компонентов -> сработает авто-заглушка
        // Админ тоже пока без компонента
      />
    </View>
  );
};

export default MainPage;