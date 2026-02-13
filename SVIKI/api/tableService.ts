import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './api-url';

const API_URL_Service = API_URL + "/service-table";

export interface IServiceTableItem {
  id: number;
  serviceColumn: string; 
  initialColumn: string; 
  standardColumn: string; 
  optimalColumn: string; 
  
  // Локальные флаги для фронтенда
  isNew?: boolean;
  isEdited?: boolean;
}

const api = axios.create({
  baseURL: API_URL_Service,
  headers: { 'Content-Type': 'application/json' },
});

// Добавляем токен к запросам
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchServiceTable = async (): Promise<IServiceTableItem[]> => {
  const response = await api.get<IServiceTableItem[]>('');
  return response.data;
};

export const createServiceTableItem = async (item: IServiceTableItem): Promise<IServiceTableItem> => {
  // Убираем локальные флаги перед отправкой
  const { isNew, isEdited, id, ...data } = item;
  // id не отправляем, если он генерируется базой, или отправляем 0
  const response = await api.post<IServiceTableItem>('', data);
  return response.data;
};

export const updateServiceTableItem = async (id: number, item: IServiceTableItem): Promise<IServiceTableItem> => {
  const { isNew, isEdited, ...data } = item;
  const response = await api.put<IServiceTableItem>(`/${id}`, data);
  return response.data;
};

export const deleteServiceTableItem = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};