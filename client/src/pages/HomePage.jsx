import React, { useState } from 'react';
import { Star, Clock, MapPin, ArrowRight, Heart, Zap, TrendingUp, Flame, Navigation, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import LocationPicker from '../components/LocationPicker';
import LocationStatus from '../components/LocationStatus';

const categories = [
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', count: '150+ places' },
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', count: '120+ places' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80', count: '80+ places' },
  { name: 'Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', count: '90+ places' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80', count: '60+ places' },
  { name: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', count: '200+ places' },
];

// Enhanced restaurants with location data
const trendingRestaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian • Pizza',
    rating: 4.5,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    price: '$$',
    tags: ['Popular', 'Fast Delivery'],
    isLiked: false,
    latitude: 40.7128,
    longitude: -74.0060,
    address: '123 Pizza Street, New York, NY'
  },
  {
    id: 2,
    name: 'Burger House',
    cuisine: 'American • Burgers',
    rating: 4.3,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    price: '$',
    tags: ['Trending'],
    isLiked: false,
    latitude: 40.7589,
    longitude: -73.9851,
    address: '456 Burger Ave, New York, NY'
  },
  {
    id: 3,
    name: 'Sushi Master',
    cuisine: 'Japanese • Sushi',
    rating: 4.7,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
    price: '$$$',
    tags: ['Premium'],
    isLiked: false,
    latitude: 40.7505,
    longitude: -73.9934,
    address: '789 Sushi Lane, New York, NY'
  },
  {
    id: 4,
    name: 'Pasta Corner',
    cuisine: 'Italian • Pasta',
    rating: 4.2,
    deliveryTime: '25-40 min',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    price: '$$',
    tags: ['New'],
    isLiked: false,
    latitude: 40.7614,
    longitude: -73.9776,
    address: '321 Pasta Road, New York, NY'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const { 
    userLocation, 
    deliveryAddress, 
    nearbyRestaurants,
    currentCity,
    isLoadingLocation,
    locationWatcher,
    getCurrentLocation, 
    startLocationWatching,
    stopLocationWatching,
    getNearbyRestaurants, 
    isInDeliveryRange,
    getEstimatedDeliveryTime,
    calculateDistance
  } = useLocation();
  
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredRestaurant, setHoveredRestaurant] = useState(null);
  const [likedRestaurants, setLikedRestaurants] = useState(new Set());
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const handleLikeRestaurant = (restaurantId) => {
    setLikedRestaurants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(restaurantId)) {
        newSet.delete(restaurantId);
      } else {
        newSet.add(restaurantId);
      }
      return newSet;
    });
  };

  const handleViewAll = () => {
    navigate('/menu');
  };

  // Get nearby restaurants based on user location
  const nearbyRestaurantsToShow = getNearbyRestaurants(trendingRestaurants, 10);

  return (
    <div className="space-y-10 mt-6 px-4 sm:px-6 md:px-10">
      {/* Location Section */}
      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Delivery Location</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 text-sm sm:text-base"
              >
                <Target className="w-4 h-4" />
                <span>{isLoadingLocation ? 'Detecting...' : 'Detect Location'}</span>
              </button>
              
              {!locationWatcher ? (
                <button
                  onClick={startLocationWatching}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Auto Track</span>
                </button>
              ) : (
                <button
                  onClick={stopLocationWatching}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Target className="w-4 h-4" />
                  <span>Stop Tracking</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Location Status Component */}
          <LocationStatus />
          
          {/* Auto-Tracking Status */}
          {locationWatcher && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900">Auto-tracking active</p>
                  <p className="text-xs text-blue-700">Restaurants will update automatically as you move</p>
                </div>
              </div>
            </div>
          )}
          
          {deliveryAddress && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{deliveryAddress.formatted}</p>
                  {currentCity && (
                    <p className="text-xs text-blue-600 font-medium">
                      📍 {currentCity.charAt(0).toUpperCase() + currentCity.slice(1)} • {nearbyRestaurants.length} restaurants nearby
                    </p>
                  )}
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-600 text-sm font-medium"
                onClick={() => setIsLocationPickerOpen(true)}
              >
                Change
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 sm:p-6 pt-16 text-white overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-in">
        <div className="relative z-10 max-w-xl mt-12">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 animate-slide-up">Hungry? We've got you covered</h1>
          <p className="text-lg sm:text-xl mb-6 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {userLocation ? 'Order from restaurants near you' : 'Order from your favorite restaurants and get it delivered to your doorstep'}
          </p>
          <button
            className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in"
            style={{ animationDelay: '0.4s' }}
            onClick={() => navigate('/menu')}
          >
            Order Now
          </button>
        </div>
        <div className="absolute right-0 top-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 sm:-mr-32 sm:-mt-32 animate-pulse"></div>
        <div className="absolute right-8 top-8 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Categories Section */}
      <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Categories</h2>
          <button 
            className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-1 transition-all duration-300 hover:scale-105 group"
            onClick={handleViewAll}
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <div 
              key={category.name} 
              className="text-center group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="relative mb-2 sm:mb-3 overflow-hidden rounded-lg">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className={`w-full h-20 sm:h-24 object-cover transition-all duration-500 ${
                    hoveredCategory === category.name ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                    hoveredCategory === category.name ? 'opacity-60' : 'opacity-20'
                  }`}></div>
                <div className="absolute top-2 right-2">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    {category.count}
                  </span>
                </div>
              </div>
              <h3 className={`font-semibold text-gray-900 text-sm sm:text-base transition-colors duration-300 ${
                hoveredCategory === category.name ? 'text-red-500' : ''
              }`}>{category.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Restaurants */}
      <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <span>
              {userLocation && currentCity && currentCity !== 'default'
                ? `🍽️ Famous Restaurants in ${currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}` 
                : userLocation 
                ? '🍽️ Restaurants Near You' 
                : '🍽️ Trending Restaurants'
              }
            </span>
          </h2>
          <button 
            className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-1 transition-all duration-300 hover:scale-105 group"
            onClick={handleViewAll}
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {nearbyRestaurantsToShow.map((restaurant, index) => {
            const isInRange = isInDeliveryRange(restaurant);
            const estimatedTime = getEstimatedDeliveryTime(restaurant);
            const distance = userLocation && restaurant.latitude ? 
              calculateDistance(userLocation.latitude, userLocation.longitude, restaurant.latitude, restaurant.longitude) : null;

            return (
              <div 
                key={restaurant.id} 
                className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up ${
                  !isInRange ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                onMouseEnter={() => setHoveredRestaurant(restaurant.id)}
                onMouseLeave={() => setHoveredRestaurant(null)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className={`w-full h-32 sm:h-48 object-cover transition-transform duration-700 ${
                      hoveredRestaurant === restaurant.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap">
                    {restaurant.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 shadow-lg animate-pulse"
                      >
                        {tag}
                      </span>
                    ))}
                    {distance && (
                      <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 shadow-lg">
                        {distance.toFixed(1)}km
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <button 
                      className={`bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                        likedRestaurants.has(restaurant.id) ? 'text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => handleLikeRestaurant(restaurant.id)}
                    >
                      <Heart className={`w-4 h-4 ${likedRestaurants.has(restaurant.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  {!isInRange && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                        Out of Range
                      </span>
                    </div>
                  )}
                  {restaurant.deliveryTime.includes('20') && isInRange && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                        <Zap className="w-3 h-3" />
                        <span>Fast</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg hover:text-red-500 transition-colors duration-200">{restaurant.name}</h3>
                    <span className="text-xs sm:text-sm text-gray-500">{restaurant.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= Math.floor(restaurant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offers Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 sm:p-8 text-white animate-fade-in" style={{ animationDelay: '1.4s' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-6 h-6 text-yellow-300 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold">Get 50% OFF</h2>
            </div>
            <p className="text-base sm:text-lg opacity-90 mb-4">On your first order with code: <span className="font-bold bg-white/20 px-2 py-1 rounded">WELCOME50</span></p>
            <button 
              className="bg-white text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleViewAll}
            >
              Order Now
            </button>
          </div>
          <div className="hidden md:block flex-1">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-20 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Location Picker Modal */}
      <LocationPicker 
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        onAddressSelect={(address) => {
          console.log('Address selected:', address);
        }}
      />
    </div>
  );
}

export default HomePage; 