import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUsersStyles } from "@/styles";
import { RoleGuard } from "@/components";
import { ClientManagersView, FullDatabaseView } from "@/features/users";

const UsersScreen = () => {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createUsersStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RoleGuard
        // Клиент видит список своих менеджеров
        client={<ClientManagersView styles={styles} />}
        // Сотрудники видят полную базу
        agent={<FullDatabaseView styles={styles} />}
        lawyer={<FullDatabaseView styles={styles} />}
        // Админ видит полную базу
        admin={<FullDatabaseView styles={styles} />}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;
