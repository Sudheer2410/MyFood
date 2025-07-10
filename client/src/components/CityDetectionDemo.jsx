import React from 'react';
import { MapPin, Navigation, Target, Star, Clock, Zap } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const CityDetectionDemo = () => {
  const { 
    userLocation, 
    deliveryAddress, 
    nearbyRestaurants,
    currentCity,
    isLoadingLocation, 
    getCurrentLocation 
  } = useLocation();

  const getCityInfo = (cityName) => {
    const cityInfo = {
      'jabalpur': {
        name: 'Jabalpur',
        state: 'Madhya Pradesh',
        description: 'Famous for its marble rocks and food culture',
        famousFor: 'Pizza Hut, KFC, McDonald\'s, Cafe Coffee Day'
      },
      'mumbai': {
        name: 'Mumbai',
        state: 'Maharashtra',
        description: 'The city of dreams with diverse cuisine',
        famousFor: 'Pizza Palace, Burger House, KFC, McDonald\'s'
      },
      'delhi': {
        name: 'Delhi',
        state: 'Delhi',
        description: 'Capital city with rich food heritage',
        famousFor: 'Sushi Master, Pasta Corner, KFC, McDonald\'s'
      },
      'bangalore': {
        name: 'Bangalore',
        state: 'Karnataka',
        description: 'Tech hub with amazing cafes',
        famousFor: 'Tech Cafe, Pizza Hut, KFC'
      },
      'chennai': {
        name: 'Chennai',
        state: 'Tamil Nadu',
        description: 'Gateway to South India with unique flavors',
        famousFor: 'Pizza Hut, KFC'
      },
      'hyderabad': {
        name: 'Hyderabad',
        state: 'Telangana',
        description: 'City of pearls with royal cuisine',
        famousFor: 'Pizza Hut, KFC'
      },
      'pune': {
        name: 'Pune',
        state: 'Maharashtra',
        description: 'Oxford of the East with vibrant food scene',
        famousFor: 'Pizza Hut, KFC'
      }
    };
    
    return cityInfo[cityName] || {
      name: 'Your City',
      state: 'Your State',
      description: 'Discovering local favorites',
      famousFor: 'Popular restaurants in your area'
    };
  };

  const cityInfo = currentCity ? getCityInfo(currentCity) : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 City Detection Demo</h2>
      
      {/* Location Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Current Location</h3>
          </div>
          <button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <Target className="w-4 h-4" />
            <span>{isLoadingLocation ? 'Detecting...' : 'Detect My City'}</span>
          </button>
        </div>

        {!userLocation ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Location not detected</p>
                <p className="text-xs text-yellow-700">Click "Detect My City" to find famous restaurants in your area</p>
              </div>
            </div>
          </div>
        ) : cityInfo ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Navigation className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-lg font-bold text-green-900">{cityInfo.name}</h4>
                  <span className="text-sm text-green-700">• {cityInfo.state}</span>
                </div>
                <p className="text-sm text-green-800 mb-2">{cityInfo.description}</p>
                <p className="text-xs text-green-700">
                  <span className="font-medium">Famous for:</span> {cityInfo.famousFor}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Location detected</p>
                <p className="text-xs text-blue-700">Finding restaurants in your area...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* City-Specific Restaurants */}
      {currentCity && nearbyRestaurants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🍽️ Famous Restaurants in {cityInfo.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyRestaurants.slice(0, 4).map((restaurant) => (
              <div 
                key={restaurant.id} 
                className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{restaurant.price}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {restaurant.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {nearbyRestaurants.length > 4 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                +{nearbyRestaurants.length - 4} more famous restaurants in {cityInfo.name}
              </p>
            </div>
          )}
        </div>
      )}

      {/* How it works */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🔍 How City Detection Works</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Your GPS coordinates are detected</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Your city is identified from coordinates</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Famous restaurants from your city are loaded</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>You see local favorites and popular chains</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetectionDemo; 