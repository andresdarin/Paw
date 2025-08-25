import api from './api';

export interface User {
  _id: string;
  name: string;
  surname: string;
  nick: string;
  email: string;
  bio?: string;
  image?: string;
  role?: string;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  user?: User;
  token?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/user/register', userData);
    return response.data;
  },

  async getProfile(id?: string): Promise<{ user: User }> {
    const url = id ? `/user/profile/${id}` : '/user/profile';
    const response = await api.get(url);
    return response.data;
  },

  async updateProfile(userData: Partial<User>): Promise<AuthResponse> {
    const response = await api.put('/user/update', userData);
    return response.data;
  },

  async uploadAvatar(file: File): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('file0', file);
    
    const response = await api.post('/user/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getUserCounters(id: string): Promise<{
    following: number;
    followed: number;
    publications: number;
  }> {
    const response = await api.get(`/user/counters/${id}`);
    return response.data;
  },

  async getUserList(page: number = 1): Promise<{
    users: User[];
    total: number;
    pages: number;
    page: number;
  }> {
    const response = await api.get(`/user/list/${page}`);
    return response.data;
  }
};