import React, { useState } from 'react';
import { MapPin, Search, X, Navigation, Target } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const LocationPicker = ({ isOpen, onClose, onAddressSelect }) => {
  const { getCurrentLocation, setDeliveryAddressManually, isLoadingLocation } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock address suggestions for different cities
  const mockAddresses = [
    // Jabalpur addresses
    { id: 1, address: 'Adhartal, Jabalpur, Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, city: 'Jabalpur' },
    { id: 2, address: 'Gorakhpur, Jabalpur, Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, city: 'Jabalpur' },
    { id: 3, address: 'Wright Town, Jabalpur, Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, city: 'Jabalpur' },
    { id: 4, address: 'Civil Lines, Jabalpur, Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, city: 'Jabalpur' },
    { id: 5, address: 'Ghamapur, Jabalpur, Madhya Pradesh', latitude: 23.1815, longitude: 79.9864, city: 'Jabalpur' },
    // Mumbai addresses
    { id: 6, address: 'Bandra West, Mumbai, Maharashtra', latitude: 19.0760, longitude: 72.8777, city: 'Mumbai' },
    { id: 7, address: 'Andheri West, Mumbai, Maharashtra', latitude: 19.0760, longitude: 72.8777, city: 'Mumbai' },
    // Delhi addresses
    { id: 8, address: 'Connaught Place, New Delhi', latitude: 28.7041, longitude: 77.1025, city: 'Delhi' },
    { id: 9, address: 'Khan Market, New Delhi', latitude: 28.7041, longitude: 77.1025, city: 'Delhi' },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockAddresses.filter(addr => 
          addr.address.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddressSelect = (address) => {
    setDeliveryAddressManually({
      latitude: address.latitude,
      longitude: address.longitude,
      address: address.address,
      formatted: address.address
    });
    onAddressSelect && onAddressSelect(address);
    onClose();
  };

  const handleCurrentLocation = () => {
    getCurrentLocation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Choose Delivery Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for address..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Current Location Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <Target className="w-5 h-5" />
            <span>{isLoadingLocation ? 'Detecting...' : 'Use Current Location'}</span>
          </button>
        </div>

        {/* Suggestions */}
        <div className="max-h-64 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="border-t border-gray-200">
              {suggestions.map((address) => (
                <button
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{address.address}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {address.latitude.toFixed(4)}, {address.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm.length > 2 ? (
            <div className="p-4 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No addresses found</p>
              <p className="text-sm text-gray-400">Try a different search term</p>
            </div>
          ) : (
            <div className="p-4 text-center">
              <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Search for an address</p>
              <p className="text-sm text-gray-400">Or use your current location</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            We'll deliver to addresses within 10km of our partner restaurants
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker; 