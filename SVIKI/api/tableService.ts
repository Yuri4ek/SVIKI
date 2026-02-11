import axios from 'axios';
import { API_URL } from './api-url';

export interface IServiceTableItem {
  id: number;
  serviceColumn: string;
  initialColumn: string;
  standardColumn: string;
  optimalColumn: string;
}

// Получение всех записей таблицы
export const fetchServiceTable = async (): Promise<IServiceTableItem[]> => {
  const response = await axios.get<IServiceTableItem[]>(`${API_URL}/service-table`);
  return response.data;
};

// Обновление одной записи (для администратора)
export const updateServiceTableItem = async (id: number, data: IServiceTableItem): Promise<void> => {
  await axios.put(`${API_URL}/service-table/${id}`, data);
};