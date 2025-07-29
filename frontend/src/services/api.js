import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const searchApi = {
  search: async (query, page = 0, pageSize = 10) => {
    try {
      const response = await api.get('/search', {
        params: { query, page, pageSize }
      });
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },

  autoComplete: async (query) => {
    try {
      const response = await api.get('/autoComplete', {
        params: { query }
      });
      // Parse the response as a JSON array and extract phrases
      let suggestions = [];
      if (typeof response.data === 'string') {
        try {
          const arr = JSON.parse(response.data);
          if (Array.isArray(arr)) {
            suggestions = arr.map(item => item.phrase).filter(Boolean);
          }
        } catch (e) {
          // Not a JSON array, ignore
        }
      } else if (Array.isArray(response.data)) {
        suggestions = response.data.map(item => item.phrase).filter(Boolean);
      }
      return suggestions;
    } catch (error) {
      console.error('Autocomplete error:', error);
      throw error;
    }
  },

  getInstantAnswer: async (query) => {
    try {
      const response = await api.get('/search/ddg-instant', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 204) {
        return null; // No content available
      }
      console.error('Instant answer error:', error);
      throw error;
    }
  }
}; 