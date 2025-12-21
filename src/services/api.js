import toast from "react-hot-toast";
import { auth } from "./firebase";
import { API_BASE_URL } from "../utils/constants";

/**
 * Always fetch a fresh Firebase ID token
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
    const errorMessage = data.error || "An error occurred";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return data;
};

const handleError = (error) => {
  console.error("API Error:", error);
  toast.error(error.message || "Network error occurred");
  throw error;
};

export const api = {
  // CUSTOMER – MENU
  getMenu: async (category = null) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/customer/menu`);
      if (category) {
        url.searchParams.append("category", category);
      }

      const response = await fetch(url);
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // CUSTOMER - ORDERS
  placeOrder: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customer/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeader()),
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // ADMIN – INGREDIENTS
  getIngredients: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/ingredients`, {
        headers: {
          ...(await getAuthHeader()),
        },
      });
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  addIngredient: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/ingredients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeader()),
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateIngredient: async (ingredientId, data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/ingredients/${ingredientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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

  deleteIngredient: async (ingredientId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/ingredients/${ingredientId}`,
        {
          method: "DELETE",
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

  // ADMIN - Dashboard & Orders approval
  getAdminDashboard: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        method: "GET",
        headers: {
          ...(await getAuthHeader()),
        },
      });
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Manage Orders - Get all orders list
  getAllOrders: async () => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch orders");
    }

    return response.json();
  },

  // View Details Modal - Get single order details
  getOrderDetails: async (orderId) => {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/admin/orders/${orderId}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch order details");
    }

    return response.json();
  },

  // Update order status
  updateOrderStatus: async (orderId, data) => {
    const headers = await getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update order status");
    }

    return response.json();
  },

  // ADMIN – DISHES
  addDish: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/dishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeader()),
        },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  updateDish: async (dishId, data) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/dishes/${dishId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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

  deleteDish: async (dishId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/dishes/${dishId}`,
        {
          method: "DELETE",
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
};
