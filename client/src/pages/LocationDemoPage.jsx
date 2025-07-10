import React, { useState } from 'react';
import { MapPin, Navigation, Target, Clock, Truck, CheckCircle, Circle, Star, Zap } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import LocationPicker from '../components/LocationPicker';
import DeliveryTracker from '../components/DeliveryTracker';
import CityDetectionDemo from '../components/CityDetectionDemo';
import LocationChangeDemo from '../components/LocationChangeDemo';

const LocationDemoPage = () => {
  const { 
    userLocation, 
    deliveryAddress, 
    isLoadingLocation, 
    getCurrentLocation, 
    getNearbyRestaurants, 
    isInDeliveryRange,
    getEstimatedDeliveryTime,
    calculateDistance
  } = useLocation();
  
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [isDeliveryTrackerVisible, setIsDeliveryTrackerVisible] = useState(false);

  // Demo restaurants with location data
  const demoRestaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian • Pizza',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Pizza Street, New York, NY'
    },
    {
      id: 2,
      name: 'Burger House',
      cuisine: 'American • Burgers',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      latitude: 40.7589,
      longitude: -73.9851,
      address: '456 Burger Ave, New York, NY'
    },
    {
      id: 3,
      name: 'Sushi Master',
      cuisine: 'Japanese • Sushi',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
      price: '$$$',
      latitude: 40.7505,
      longitude: -73.9934,
      address: '789 Sushi Lane, New York, NY'
    }
  ];

  const nearbyRestaurants = getNearbyRestaurants(demoRestaurants, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">📍 Location Features Demo</h1>
          <p className="text-base sm:text-lg text-gray-600">Explore all the location-based features we've implemented</p>
        </div>

        {/* City Detection Demo */}
        <CityDetectionDemo />
        
        {/* Auto Location Updates Demo */}
        <LocationChangeDemo />
        
        {/* Location Status */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Current Location Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">User Location</h3>
              </div>
              {userLocation ? (
                <p className="text-sm text-blue-700">
                  {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </p>
              ) : (
                <p className="text-sm text-blue-500">Not detected</p>
              )}
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Delivery Address</h3>
              </div>
              {deliveryAddress ? (
                <p className="text-sm text-green-700">{deliveryAddress.formatted}</p>
              ) : (
                <p className="text-sm text-green-500">Not set</p>
              )}
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Navigation className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Nearby Restaurants</h3>
              </div>
              <p className="text-sm text-purple-700">{nearbyRestaurants.length} found</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 text-sm sm:text-base"
            >
              <Target className="w-5 h-5" />
              <span>{isLoadingLocation ? 'Detecting...' : 'Detect My Location'}</span>
            </button>
          </div>
        </div>

        {/* Location Picker Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">📍 Location Picker</h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Test the location picker with address search and current location detection</p>
          <button
            onClick={() => setIsLocationPickerOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            Open Location Picker
          </button>
        </div>

        {/* Nearby Restaurants Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">🍽️ Nearby Restaurants</h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Restaurants filtered by distance from your location</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyRestaurants.map((restaurant) => {
              const isInRange = isInDeliveryRange(restaurant);
              const estimatedTime = getEstimatedDeliveryTime(restaurant);
              const distance = userLocation && restaurant.latitude ? 
                calculateDistance(userLocation.latitude, userLocation.longitude, restaurant.latitude, restaurant.longitude) : null;

              return (
                <div 
                  key={restaurant.id} 
                  className={`bg-gray-50 rounded-xl p-4 transition-all duration-300 ${
                    !isInRange ? 'opacity-60' : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
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
                    
                    {distance && (
                      <div className="flex items-center space-x-1 text-sm text-blue-600">
                        <Navigation className="w-4 h-4" />
                        <span>{distance.toFixed(1)} km away</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{estimatedTime}</span>
                    </div>
                    
                    {!isInRange && (
                      <div className="flex items-center space-x-1 text-sm text-red-600">
                        <span className="bg-red-100 px-2 py-1 rounded-full text-xs">Out of Range</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Tracking Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🚚 Delivery Tracking</h2>
          <p className="text-gray-600 mb-4">Real-time delivery status and tracking information</p>
          <button
            onClick={() => setIsDeliveryTrackerVisible(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Show Delivery Tracker
          </button>
        </div>

        {/* Feature List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ Location Features Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Current Location Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Address Search & Selection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Distance Calculation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Nearby Restaurant Filtering</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Delivery Range Checking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Estimated Delivery Times</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Real-time Delivery Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Location-based UI Updates</span>
              </div>
            </div>
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

      {/* Delivery Tracker */}
      <DeliveryTracker 
        order={{ id: 'DEMO123' }}
        isVisible={isDeliveryTrackerVisible}
        onClose={() => setIsDeliveryTrackerVisible(false)}
      />
    </div>
  );
};

export default LocationDemoPage; 