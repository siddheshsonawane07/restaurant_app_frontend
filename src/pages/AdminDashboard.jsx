import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { IngredientForm } from '../components/IngredientForm';
import { DishForm } from '../components/DishForm';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [ingredients, setIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    if (activeTab === 'ingredients') {
      fetchIngredients();
    } else {
      fetchDishes();
    }
  }, [activeTab]);

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const response = await api.getIngredients();
      setIngredients(response.ingredients);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await api.getMenu();
      setDishes(response.menu);
    } catch (error) {
      console.error('Failed to fetch dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIngredient = async (ingredientName) => {
    if (window.confirm(`Are you sure you want to delete ${ingredientName}?`)) {
      try {
        await api.deleteIngredient(ingredientName);
        toast.success('Ingredient deleted successfully');
        fetchIngredients();
      } catch (error) {
        console.error('Failed to delete ingredient:', error);
      }
    }
  };

  const handleDeleteDish = async (dishName) => {
    if (window.confirm(`Are you sure you want to delete ${dishName}?`)) {
      try {
        await api.deleteDish(dishName);
        toast.success('Dish deleted successfully');
        fetchDishes();
      } catch (error) {
        console.error('Failed to delete dish:', error);
      }
    }
  };

  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setShowIngredientForm(true);
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setShowDishForm(true);
  };

  const handleCloseIngredientForm = () => {
    setShowIngredientForm(false);
    setEditingIngredient(null);
  };

  const handleCloseDishForm = () => {
    setShowDishForm(false);
    setEditingDish(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'ingredients'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Ingredients
              </button>
              <button
                onClick={() => setActiveTab('dishes')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'dishes'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Manage Dishes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'ingredients' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Ingredients</h2>
                  <button
                    onClick={() => setShowIngredientForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add New Ingredient
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : ingredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No ingredients added yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reorder Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ingredients.map((ingredient) => (
                          <tr key={ingredient.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ingredient.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.reorderLevel || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.cost ? `$${ingredient.cost.toFixed(2)}` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {ingredient.reorderLevel && ingredient.quantity < ingredient.reorderLevel ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Low Stock
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  In Stock
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditIngredient(ingredient)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteIngredient(ingredient.name)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'dishes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Dishes</h2>
                  <button
                    onClick={() => setShowDishForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add New Dish
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : dishes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No dishes added yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dishes.map((dish) => (
                      <div key={dish.name} className="border border-gray-200 rounded-lg p-4">
                        {dish.imageUrl && (
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold text-green-600">
                            ${dish.price.toFixed(2)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            dish.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {dish.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {dish.category}
                          </span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                          <button
                            onClick={() => handleEditDish(dish)}
                            className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.name)}
                            className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showIngredientForm && (
        <IngredientForm
          ingredient={editingIngredient}
          onSuccess={() => {
            fetchIngredients();
            handleCloseIngredientForm();
          }}
          onClose={handleCloseIngredientForm}
        />
      )}

      {showDishForm && (
        <DishForm
          dish={editingDish}
          onSuccess={() => {
            fetchDishes();
            handleCloseDishForm();
          }}
          onClose={handleCloseDishForm}
        />
      )}
    </div>
  );
};