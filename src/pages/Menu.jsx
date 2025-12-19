import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { DishCard } from '../components/DishCard';
import { Cart } from '../components/Cart';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, [category]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await api.getMenu(category || null);
      setMenu(response.menu);
      
      const uniqueCategories = [...new Set(response.menu.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (dish) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === dish.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
    toast.success(`${dish.name} added to cart`);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Menu</h1>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Filter by category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : menu.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No dishes available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />
    </div>
  );
};