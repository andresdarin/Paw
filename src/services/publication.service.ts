import api from './api';

export interface Publication {
  _id: string;
  user: {
    _id: string;
    name: string;
    surname: string;
    nick: string;
    image?: string;
  };
  text: string;
  file?: string;
  created_at: string;
  updated_at?: string;
}

export interface PublicationData {
  text: string;
}

export interface PublicationResponse {
  status: string;
  message: string;
  publication?: Publication;
}

export const publicationService = {
  async createPublication(data: PublicationData): Promise<PublicationResponse> {
    const response = await api.post('/publication/save', data);
    return response.data;
  },

  async uploadPublicationImage(publicationId: string, file: File): Promise<PublicationResponse> {
    const formData = new FormData();
    formData.append('file0', file);
    
    const response = await api.post(`/publication/upload/${publicationId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getPublication(id: string): Promise<{ publication: Publication }> {
    const response = await api.get(`/publication/detail/${id}`);
    return response.data;
  },

  async deletePublication(id: string): Promise<{ status: string; message: string }> {
    const response = await api.delete(`/publication/remove/${id}`);
    return response.data;
  },

  async getFeed(page: number = 1): Promise<{
    publications: Publication[];
    total: number;
    pages: number;
    page: number;
  }> {
    const response = await api.get(`/publication/feed/${page}`);
    return response.data;
  },

  async getUserPublications(userId: string, page: number = 1): Promise<{
    publications: Publication[];
    total: number;
    pages: number;
    page: number;
  }> {
    const response = await api.get(`/publication/user/${userId}/${page}`);
    return response.data;
  }
};