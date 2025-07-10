import React from 'react';
import { MapPin, Navigation, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const LocationStatus = () => {
  const { userLocation, deliveryAddress, currentCity, isLoadingLocation } = useLocation();

  if (isLoadingLocation) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <div>
            <p className="text-sm font-medium text-blue-900">Detecting your location...</p>
            <p className="text-xs text-blue-600">Please allow location access</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-900">Location not detected</p>
            <p className="text-xs text-yellow-700">Click "Detect Location" to get started</p>
          </div>
        </div>
      </div>
    );
  }

  if (!deliveryAddress) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-orange-900">Location detected, getting address...</p>
            <p className="text-xs text-orange-700">Please wait while we fetch your address</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-6 h-6 text-green-600" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="w-4 h-4 text-green-600" />
            <p className="text-sm font-medium text-green-900">Location Detected</p>
          </div>
          <p className="text-sm text-green-800 font-medium">{deliveryAddress.formatted}</p>
          {currentCity && (
            <div className="flex items-center space-x-2 mt-1">
              <Navigation className="w-3 h-3 text-green-600" />
              <p className="text-xs text-green-700">
                📍 {currentCity.charAt(0).toUpperCase() + currentCity.slice(1)} • Ready for delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationStatus; 