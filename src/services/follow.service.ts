import api from './api';
import { User } from './auth.service';

export interface FollowResponse {
  status: string;
  message: string;
  follow?: any;
}

export const followService = {
  async followUser(userId: string): Promise<FollowResponse> {
    const response = await api.post('/follow/save', { followed: userId });
    return response.data;
  },

  async unfollowUser(userId: string): Promise<FollowResponse> {
    const response = await api.delete(`/follow/unfollow/${userId}`);
    return response.data;
  },

  async getFollowing(userId?: string, page: number = 1): Promise<{
    follows: { followed: User }[];
    total: number;
    pages: number;
    page: number;
  }> {
    const url = userId 
      ? `/follow/following/${userId}/${page}`
      : `/follow/following/${page}`;
    const response = await api.get(url);
    return response.data;
  },

  async getFollowers(userId?: string, page: number = 1): Promise<{
    follows: { user: User }[];
    total: number;
    pages: number;
    page: number;
  }> {
    const url = userId 
      ? `/follow/followers/${userId}/${page}`
      : `/follow/followers/${page}`;
    const response = await api.get(url);
    return response.data;
  }
};