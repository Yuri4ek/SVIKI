import React, { ReactNode } from "react";
import { useUserStore } from "@/store";
import { Placeholder } from "@/components/ui";

interface Props {
  client?: ReactNode;
  agent?: ReactNode;
  lawyer?: ReactNode;
  admin?: ReactNode;
  manager?: ReactNode;
}

export const RoleGuard = ({ client, agent, lawyer, admin, manager }: Props) => {
  const role = useUserStore((state) => state.role);

  switch (role) {
    case "Client":
      return <>{client ?? <Placeholder title="Кабинет Клиента" />}</>;

    case "Agent":
      return <>{agent ?? <Placeholder title="Кабинет Агента" />}</>;

    case "Lawyer":
      return <>{lawyer ?? <Placeholder title="Кабинет Юриста" />}</>;

    case "Admin":
      return <>{admin ?? <Placeholder title="Панель Администратора" />}</>;

    case "Manager":
      return <>{manager ?? <Placeholder title="Панель Менеджера" />}</>;

    default:
      return <Placeholder title="Роль не определена" />;
  }
};
