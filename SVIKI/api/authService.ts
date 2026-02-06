import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './API_URL';

const API_URL_Auth = API_URL + "/auth";

const api = axios.create({
  baseURL: API_URL_Auth,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginResponse {
  token: string;
  tokenExpired: 0;
  refreshToken: string;
}

export const authService = {
  login: async (phoneEmail: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/login', {
        phoneEmail: phoneEmail,
        password: password,
        remember: true,
      });
      
      // Сохраняем токены безопасно
      await SecureStore.setItemAsync('token', response.data.token);
      await SecureStore.setItemAsync('refreshToken', response.data.refreshToken);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 2. Регистрация
  register: async (phone: number, password: string, role: string) => {
    try {
      const response = await api.post('/register', {
        phone: phone, 
        password: password,
        role: role,
        confirmPassword: password,
        checktTerms: "",
        referralCode: "",
      });
      
      return response.data; // Возвращает userId
    } catch (error) {
      throw error;
    }
  },

  // 3. Подтверждение кода (если нужно сразу после регистрации)
  confirmCode: async (userId: number, code: string) => {
      const response = await api.post('/confirm-code', {
        userId,
        code
      });
      return response.data;
  }
};