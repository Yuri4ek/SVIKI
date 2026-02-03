import React, { ReactNode } from 'react';
import { useUserStore } from '@/store';
import { Placeholder } from '@/components/ui';

interface Props {
  client?: ReactNode;
  agent?: ReactNode;
  lawyer?: ReactNode;
  admin?: ReactNode;
  
  // Если true, Агент и Юрист будут использовать agent компонент (если lawyer не передан явно) --- на данный момент не испоьзуется
  unifyAgentLawyer?: boolean; 
}

export const RoleGuard = ({ 
  client, 
  agent, 
  lawyer, 
  admin,
  unifyAgentLawyer = false 
}: Props) => {
  const role = useUserStore((state) => state.role);

  switch (role) {
    case 'Клиент':
      return <>{client ?? <Placeholder title="Кабинет Клиента" />}</>;

    case 'Агент':
      return <>{agent ?? <Placeholder title="Кабинет Агента" />}</>;

    case 'Юрист':
      return <>{lawyer ?? <Placeholder title="Кабинет Юриста" />}</>;

    case 'Админ':
      return <>{admin ?? <Placeholder title="Панель Администратора" />}</>;

    default:
      return <Placeholder title="Роль не определена" />;
  }
};