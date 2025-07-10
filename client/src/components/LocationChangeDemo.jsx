import React, { useState } from 'react';
import { MapPin, Navigation, Target, Star, Clock, Zap, RefreshCw } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const LocationChangeDemo = () => {
  const { 
    userLocation, 
    currentCity,
    nearbyRestaurants,
    locationWatcher,
    startLocationWatching,
    stopLocationWatching
  } = useLocation();
  
  const [simulatedLocation, setSimulatedLocation] = useState(null);

  // Simulate location changes for demo
  const simulateLocationChange = (cityName, coordinates) => {
    setSimulatedLocation({ city: cityName, coords: coordinates });
    
    // Simulate the location update
    setTimeout(() => {
      // This would normally be handled by the location watcher
      console.log(`Simulated location change to ${cityName}`);
    }, 1000);
  };

  const demoLocations = [
    { name: 'Jabalpur', coords: { latitude: 23.1815, longitude: 79.9864 } },
    { name: 'Mumbai', coords: { latitude: 19.0760, longitude: 72.8777 } },
    { name: 'Delhi', coords: { latitude: 28.7041, longitude: 77.1025 } },
    { name: 'Bangalore', coords: { latitude: 12.9716, longitude: 77.5946 } },
    { name: 'Hyderabad', coords: { latitude: 17.3850, longitude: 78.4867 } }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">🔄 Auto Location Updates</h2>
      
      {/* Current Status */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">Location Tracking</h3>
          </div>
          <div className="flex items-center space-x-2">
            {!locationWatcher ? (
              <button
                onClick={startLocationWatching}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                <Navigation className="w-4 h-4" />
                <span>Start Auto-Track</span>
              </button>
            ) : (
              <button
                onClick={stopLocationWatching}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                <Target className="w-4 h-4" />
                <span>Stop Tracking</span>
              </button>
            )}
          </div>
        </div>

        {locationWatcher ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-green-900">Auto-tracking active</p>
                <p className="text-xs text-green-700">Restaurants will update automatically when you change location</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Auto-tracking inactive</p>
                <p className="text-xs text-yellow-700">Click "Start Auto-Track" to enable automatic updates</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Location Info */}
      {currentCity && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Current Location</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Navigation className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="text-lg font-bold text-blue-900">{currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}</h4>
                <p className="text-sm text-blue-700">{nearbyRestaurants.length} famous restaurants available</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Location Changes */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Demo Location Changes</h3>
        <p className="text-sm text-gray-600 mb-4">Click a city to simulate moving there and see restaurants update:</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {demoLocations.map((location) => (
            <button
              key={location.name}
              onClick={() => simulateLocationChange(location.name, location.coords)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                simulatedLocation?.city === location.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">{location.name}</p>
                <p className="text-xs text-gray-500">
                  {location.coords.latitude.toFixed(2)}, {location.coords.longitude.toFixed(2)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* How Auto-Tracking Works */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">🔍 How Auto-Tracking Works</h3>
        <div className="space-y-2 text-sm text-purple-800">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Enable auto-tracking with "Start Auto-Track"</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>App continuously monitors your GPS location</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>When you move to a new city, restaurants update automatically</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>You see famous restaurants from your new location instantly</span>
          </div>
        </div>
      </div>

      {/* Real-time Updates Info */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-900">Real-time Updates</p>
            <p className="text-xs text-green-700">Restaurants update every minute when auto-tracking is active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationChangeDemo; 