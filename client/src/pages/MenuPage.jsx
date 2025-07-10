import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Search, Filter, Star, Clock, Plus, Minus, Heart, Zap, MapPin, Navigation } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useLocation } from '../context/LocationContext';
import { foodApi } from '../api/foodApi';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const { addToCart, updateQuantity, items: cartItems } = useCart();
  const { searchTerm } = useSearch();
  const { userLocation, deliveryAddress, getEstimatedDeliveryTime, isInDeliveryRange } = useLocation();

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
      <div className="animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Menu</h1>
        <p className="text-gray-600 text-base sm:text-lg">Discover delicious dishes from around the world</p>
        
        {/* Location Info */}
        {deliveryAddress && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">Delivering to:</p>
                <p className="text-xs text-blue-700">{deliveryAddress.formatted}</p>
              </div>
              <Navigation className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        )}
      </div>

      {/* Cuisine Filter */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm sm:text-base font-medium text-gray-700">Filter by:</span>
          </div>
          <select
            value={selectedCuisine}
            onChange={(e) => handleCuisineFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 w-full sm:w-auto"
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 animate-fade-in">
        <p className="text-gray-600 text-sm sm:text-base">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
        {cartItems.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base shadow-lg animate-pulse">
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items in cart
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 animate-pulse">Loading menu items...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={`w-full h-32 sm:h-48 object-cover transition-transform duration-700 ${
                    hoveredItem === item.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                    {item.cuisineType}
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <button className="bg-white/80 backdrop-blur-sm text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                {item.readyInMinutes <= 20 && (
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                      <Zap className="w-3 h-3" />
                      <span>Fast</span>
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 hover:text-red-500 transition-colors duration-200">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">4.5</span>
                    <span className="text-xs sm:text-sm text-gray-500">(120)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{userLocation ? getEstimatedDeliveryTime({ latitude: 40.7128, longitude: -74.0060 }) : `${item.readyInMinutes || 25}-${item.readyInMinutes + 10 || 35} min`}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg sm:text-xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    {getCartQuantity(item.id) > 0 && (
                      <>
                        <span className="text-xs sm:text-sm font-semibold bg-gray-100 px-2 py-1 rounded-full animate-pulse">
                          {getCartQuantity(item.id)}
                        </span>
                        <button
                          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110"
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
        <div className="text-center py-12 animate-fade-in">
          <div className="text-gray-400 text-6xl mb-4 animate-bounce">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default MenuPage; 