import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './api-url';

const API_URL_Auth = API_URL + "/auth";

const api = axios.create({
  baseURL: API_URL_Auth,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginResponse {
  token: string;
  tokenExpired: number;
  refreshToken: string;
  role: string;
}

export interface SvikiJwtPayload {
  userid: string; 
  unique_name?: string; 
  phone?: string; 
  role: string; 
  exp: number; // Время истечения
  iss?: string; // "sviki"
  aud?: string; // "sviki"
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export const authService = {
  login: async (phoneEmail: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/login', {
        phoneEmail: phoneEmail,
        password: password,
        remember: true,
      });

      const { token, refreshToken, tokenExpired } = response.data;
      
      const decoded = jwtDecode<SvikiJwtPayload>(token);

      console.log("Decoded Token:", JSON.stringify(decoded, null, 2));
      
      let rawRole = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
      const userRole = Array.isArray(rawRole) ? rawRole[0] : rawRole;

      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      
      return {
        token,
        refreshToken,
        tokenExpired,
        role: userRole,
      };
    } catch (error) {
      throw error;
    }
  },

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
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  confirmCode: async (userId: number, code: string) => {
      const response = await api.post('/confirm-code', {
        userId,
        code
      });
      return response.data;
  }
};