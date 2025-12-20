import { useState, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const DishForm = ({ dish, onSuccess, onClose }) => {
  const isEditMode = !!dish;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    preparationTime: 0,
    imageUrl: '',
    available: true,
  });
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingIngredients, setFetchingIngredients] = useState(true);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || '',
        description: dish.description || '',
        price: dish.price || 0,
        category: dish.category || '',
        preparationTime: dish.preparationTime || 0,
        imageUrl: dish.imageUrl || '',
        available: dish.available !== undefined ? dish.available : true,
      });

      if (dish.ingredients && Array.isArray(dish.ingredients)) {
        const selected = {};
        dish.ingredients.forEach(ing => {
          selected[ing.ingredientId] = ing.quantity;
        });
        setSelectedIngredients(selected);
      }
    }
  }, [dish]);

  const fetchIngredients = async () => {
    try {
      const response = await api.getIngredients();
      setIngredients(response.ingredients);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    } finally {
      setFetchingIngredients(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              (name === 'price' || name === 'preparationTime') ? parseFloat(value) || 0 : 
              value,
    }));
  };

  const handleIngredientToggle = (ingredientName) => {
    setSelectedIngredients(prev => {
      const updated = { ...prev };
      if (updated[ingredientName]) {
        delete updated[ingredientName];
      } else {
        updated[ingredientName] = 0;
      }
      return updated;
    });
  };

  const handleIngredientQuantity = (ingredientName, quantity) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredientName]: parseFloat(quantity) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category.trim()) {
      toast.error('Name and category are required');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    const ingredientsList = Object.entries(selectedIngredients)
      .filter(([_, quantity]) => quantity > 0)
      .map(([ingredientId, quantity]) => ({
        ingredientId,
        quantity,
      }));

    if (ingredientsList.length === 0) {
      toast.error('Please select at least one ingredient with quantity > 0');
      return;
    }

    const dishData = {
      ...formData,
      ingredients: ingredientsList,
    };

    setLoading(true);
    try {
      if (isEditMode) {
        const updateData = {
          description: formData.description,
          price: formData.price,
          category: formData.category,
          preparationTime: formData.preparationTime,
          imageUrl: formData.imageUrl,
          available: formData.available,
          ingredients: ingredientsList,
        };
        await api.updateDish(dish.name, updateData);
        toast.success('Dish updated successfully');
      } else {
        await api.addDish(dishData);
        toast.success('Dish added successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to save dish:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isEditMode ? 'Edit Dish' : 'Add New Dish'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Appetizer, Main Course"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (min)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Available for customers
            </label>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">Select Ingredients *</h3>
            {fetchingIngredients ? (
              <p className="text-gray-500">Loading ingredients...</p>
            ) : ingredients.length === 0 ? (
              <p className="text-gray-500">No ingredients available. Please add ingredients first.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded p-3">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.name} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={!!selectedIngredients[ingredient.name]}
                      onChange={() => handleIngredientToggle(ingredient.name)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label className="flex-1 text-sm">
                      {ingredient.name} ({ingredient.unit})
                    </label>
                    {selectedIngredients[ingredient.name] !== undefined && (
                      <input
                        type="number"
                        value={selectedIngredients[ingredient.name]}
                        onChange={(e) => handleIngredientQuantity(ingredient.name, e.target.value)}
                        min="0"
                        step="0.01"
                        placeholder="Quantity"
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || ingredients.length === 0}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Dish' : 'Add Dish')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};