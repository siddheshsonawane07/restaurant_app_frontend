import toast from 'react-hot-toast';
import { auth } from './firebase';
import { API_BASE_URL } from '../utils/constants';

/**
 * Always fetch fresh token
 */
const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (!user) return {};

  const token = await user.getIdToken(true);
  return {
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.error || 'An error occurred';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return data;
};

const handleError = (error) => {
  console.error('API Error:', error);
  toast.error(error.message || 'Network error occurred');
  throw error;
};

export const api = {
  getMenu: async (category = null) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/customer/menu`);
      if (category) {
        url.searchParams.append('category', category);
      }

      const response = await fetch(url);
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  getIngredients: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/ingredients`,
        {
          headers: {
            ...(await getAuthHeader()),
          },
        }
      );
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  addIngredient: async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/ingredients`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeader()),
          },
          body: JSON.stringify(data),
        }
      );
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  addDish: async (data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/dishes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(await getAuthHeader()),
          },
          body: JSON.stringify(data),
        }
      );
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};
