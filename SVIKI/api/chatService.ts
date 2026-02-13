import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_URL } from './api-url'; 

const API_URL_Chat = API_URL + "/chat";

export interface AttachmentModel {
  id: number;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  url: string;
}

export interface MessageModel {
  id: number;
  content?: string;
  senderId: number;
  receiverId: number;
  sentAt: string;       // DateTime приходит строкой ISO
  readAt?: string;
  isRead: boolean;
  attachment?: AttachmentModel;
  
  // Поля для UI (опциональные)
  isMy?: boolean; 
}

export interface ChatContact {
  receiverId: number;
  name: string;
  dialogId: number;     // Важное поле для отправки
  lastMessage?: string;
  lastMessageDate?: string;
  unreadCount: number;
  avatar?: string;      // Если нужно для UI
}

export interface ChatModel {
  dialogId: number;
  receiverId: number;
  receiverName: string;
  messages: MessageModel[];
}

const api = axios.create({
  baseURL: API_URL_Chat,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatService = {
  getContacts: async (userRole: 'Client' | 'Agent' | 'Lawyer' | 'Admin' | 'Manager', search: string = '') => {
    try {
      const query = search ? `/${encodeURIComponent(search)}` : '';
      let endpoint = '';

      switch (userRole) {
        case 'Client':
          endpoint = `/client-contacts${query}`;
          break;
        case 'Lawyer':
          endpoint = `/lawyer-client-contacts${query}`;
          break;
        case 'Agent':
          // Если агент видит клиентов и менеджеров, используйте нужный метод
          // В контроллере есть agent-manager-and-admin-contacts
          endpoint = `/agent-manager-and-admin-contacts${query}`; 
          break;
        case 'Admin':
        case 'Manager':
          endpoint = `/admin-client-contacts${query}`;
          break;
        default:
          throw new Error("Неизвестная роль");
      }

      const response = await api.get<ChatContact[]>(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAdminAgentContacts: async (search: string = '') => {
    const query = search ? `/${encodeURIComponent(search)}` : '';
    const response = await api.get<ChatContact[]>(`/admin-agent-contacts${query}`);
    return response.data;
  },

  getAdminLawyerContacts: async (search: string = '') => {
    const query = search ? `/${encodeURIComponent(search)}` : '';
    const response = await api.get<ChatContact[]>(`/admin-lawyer-contacts${query}`);
    return response.data;
  },

  /**
   * Получение истории чата (и ID диалога)
   */
  getChatHistory: async (receiverId: number) => {
    // Используем эндпоинт, который возвращает ChatModel с DialogId
    const response = await api.get<ChatModel>(`/user-chat-message/${receiverId}`);
    return response.data;
  },

  /**
   * Отправка сообщения (Используем FETCH для стабильности FormData)
   */
  sendMessage: async (receiverId: number, content?: string, file?: any, dialogId?: number) => {
    try {
      const formData = new FormData();

      // Обязательные поля
      formData.append('ReceiverId', String(receiverId));
      formData.append('Content', content || "");

      // Если есть ID диалога, передаем его (бэкенд может требовать)
      if (dialogId) {
        formData.append('DialogId', String(dialogId));
      }

      // Файл
      if (file) {
        const fileToUpload = {
          uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
          type: file.mimeType || 'application/octet-stream', 
          name: file.fileName || 'file.bin',
        };
        // C# модель обычно ждет "File" или "Attachment". 
        // Судя по контроллеру, скорее всего "File" (стандарт IFormFile)
        formData.append('File', fileToUpload as any);
      }

      const token = await SecureStore.getItemAsync('token');

      // Используем fetch, он сам ставит boundary
      const response = await fetch(`${API_URL_Chat}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data', // НЕ РАСКОММЕНТИРОВАТЬ!
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Server Error Details:", JSON.stringify(responseData, null, 2));
        throw new Error(responseData.error || responseData.title || "Ошибка отправки");
      }

      return responseData as MessageModel;

    } catch (error) {
      console.error("Chat Send Error:", error);
      throw error;
    }
  },

  /**
   * Получение ссылки на файл
   */
  getFileUrl: (attachmentId: number) => {
    return `${API_URL_Chat}/download/${attachmentId}`;
  },
  
  /**
   * Скачивание файла как Blob
   */
  downloadFileBlob: async (attachmentId: number) => {
    const response = await api.get(`/download/${attachmentId}`, {
      responseType: 'blob'
    });
    return response.data;
  }
};