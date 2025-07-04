import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Search, Filter, Star, Clock, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { foodApi } from '../api/foodApi';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const { addToCart, updateQuantity, items: cartItems } = useCart();
  const { searchTerm } = useSearch();

  const cuisineTypes = ['all', 'Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'Japanese', 'Thai', 'Mediterranean'];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await foodApi.getRandomRecipes(20);
      setMenuItems(items);
    } catch (error) {
      toast.error('Failed to load menu items');
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleCuisineFilter = async (cuisine) => {
    setSelectedCuisine(cuisine);
    
    if (cuisine === 'all') {
      loadMenuItems();
      return;
    }

    try {
      setLoading(true);
      const items = await foodApi.getRecipesByCuisine(cuisine, 20);
      setMenuItems(items);
    } catch (error) {
      toast.error('Failed to filter menu items');
      console.error('Error filtering menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromCart = (item) => {
    const currentQuantity = cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0;
    if (currentQuantity > 1) {
      updateQuantity(item.id, currentQuantity - 1);
    } else {
      updateQuantity(item.id, 0);
    }
    toast.success(`${item.name} removed from cart!`);
  };

  const getCartQuantity = (itemId) => {
    return cartItems.find(item => item.id === itemId)?.quantity || 0;
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || item.cuisineType === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Menu</h1>
        <p className="text-gray-600 text-base sm:text-lg">Discover delicious dishes from around the world</p>
      </div>

      {/* Cuisine Filter */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCuisine}
              onChange={(e) => handleCuisineFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
            >
              {cuisineTypes.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
        {cartItems.length > 0 && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base">
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items in cart
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {item.cuisineType}
                  </span>
                </div>
              </div>
              
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">4.5</span>
                    <span className="text-xs sm:text-sm text-gray-500">(120 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{item.readyInMinutes || 25}-{item.readyInMinutes + 10 || 35} min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition text-lg"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    {getCartQuantity(item.id) > 0 && (
                      <>
                        <span className="text-xs sm:text-sm font-semibold">{getCartQuantity(item.id)}</span>
                        <button
                          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition text-lg"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default MenuPage; 