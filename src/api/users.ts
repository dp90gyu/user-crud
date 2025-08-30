import axios, { AxiosResponse } from 'axios';

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

// Base URL for JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API service for user operations
export const userService = {
  // Fetch all users
  async getUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Fetch single user by ID
  async getUserById(id: string | number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Create new user
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Update existing user
  async updateUser(id: string | number, userData: CreateUserData): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  },

  // Delete user
  async deleteUser(id: string | number): Promise<{}> {
    try {
      const response: AxiosResponse<{}> = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete user: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
};
