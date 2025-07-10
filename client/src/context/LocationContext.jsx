import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getRestaurantsByCity, getCityFromCoordinates } from '../data/cityRestaurants';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [currentCity, setCurrentCity] = useState(null);
  const [locationWatcher, setLocationWatcher] = useState(null);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleLocationUpdate(position.coords);
      },
      (error) => {
        console.error('Location error:', error);
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            setLocationPermission('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        
        toast.error(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Handle location updates (called when location changes)
  const handleLocationUpdate = (coords) => {
    const { latitude, longitude } = coords;
    const location = { latitude, longitude };
    
    setUserLocation(location);
    localStorage.setItem('userLocation', JSON.stringify(location));
    
    // Get address from coordinates
    getAddressFromCoords(latitude, longitude);
    
    // Get city-specific restaurants
    const cityKey = getCityFromCoordinates(latitude, longitude);
    const cityRestaurants = getRestaurantsByCity(cityKey);
    setNearbyRestaurants(cityRestaurants);
    setCurrentCity(cityKey);
    
    // Show success message with detected city
    if (cityKey !== 'default') {
      toast.success(`📍 Location updated: ${cityKey.charAt(0).toUpperCase() + cityKey.slice(1)} • ${cityRestaurants.length} famous restaurants found!`);
    } else {
      toast.success('📍 Location updated! Showing popular restaurants.');
    }
    
    setIsLoadingLocation(false);
  };

  // Get address from coordinates using reverse geocoding
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      // Using a free reverse geocoding service (Nominatim)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        const address = data.display_name;
        const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown City';
        const state = data.address?.state || 'Unknown State';
        const country = data.address?.country || 'Unknown Country';
        
        setDeliveryAddress({
          latitude,
          longitude,
          address,
          formatted: `${city}, ${state}, ${country}`,
          city,
          state,
          country,
          fullAddress: address
        });
        localStorage.setItem('deliveryAddress', JSON.stringify({
          latitude,
          longitude,
          address,
          formatted: `${city}, ${state}, ${country}`,
          city,
          state,
          country,
          fullAddress: address
        }));
        
        toast.success(`Location detected: ${city}, ${state}`);
      }
    } catch (error) {
      console.error('Error getting address:', error);
      // Fallback to coordinates
      setDeliveryAddress({
        latitude,
        longitude,
        address: `${latitude}, ${longitude}`,
        formatted: `${latitude}, ${longitude}`,
        city: 'Unknown City',
        state: 'Unknown State',
        country: 'Unknown Country'
      });
    }
  };

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Get nearby restaurants based on user location
  const getNearbyRestaurants = (restaurants, maxDistance = 10) => {
    if (!userLocation) return nearbyRestaurants.length > 0 ? nearbyRestaurants : restaurants;

    const nearby = restaurants.filter(restaurant => {
      if (!restaurant.latitude || !restaurant.longitude) return true;
      
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        restaurant.latitude,
        restaurant.longitude
      );
      
      return distance <= maxDistance;
    });

    // Sort by distance
    nearby.sort((a, b) => {
      if (!a.latitude || !b.latitude) return 0;
      
      const distanceA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude
      );
      
      const distanceB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude
      );
      
      return distanceA - distanceB;
    });

    return nearby;
  };

  // Set delivery address manually
  const setDeliveryAddressManually = (address) => {
    setDeliveryAddress(address);
    localStorage.setItem('deliveryAddress', JSON.stringify(address));
  };

  // Check if restaurant is in delivery range
  const isInDeliveryRange = (restaurant, maxDistance = 10) => {
    if (!userLocation || !restaurant.latitude || !restaurant.longitude) return true;
    
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      restaurant.latitude,
      restaurant.longitude
    );
    
    return distance <= maxDistance;
  };

  // Get estimated delivery time based on distance
  const getEstimatedDeliveryTime = (restaurant) => {
    if (!userLocation || !restaurant.latitude || !restaurant.longitude) {
      return '25-35 min';
    }
    
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      restaurant.latitude,
      restaurant.longitude
    );
    
    // Base time: 20 minutes + 5 minutes per km
    const baseTime = 20;
    const additionalTime = Math.round(distance * 5);
    const totalTime = baseTime + additionalTime;
    
    return `${totalTime}-${totalTime + 10} min`;
  };

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    const savedAddress = localStorage.getItem('deliveryAddress');
    
    if (savedLocation) {
      setUserLocation(JSON.parse(savedLocation));
    }
    
    if (savedAddress) {
      setDeliveryAddress(JSON.parse(savedAddress));
    }
  }, []);

  // Start watching location changes
  const startLocationWatching = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    // Clear any existing watcher
    if (locationWatcher) {
      navigator.geolocation.clearWatch(locationWatcher);
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        handleLocationUpdate(position.coords);
      },
      (error) => {
        console.error('Location watching error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minute
      }
    );

    setLocationWatcher(watcher);
    toast.info('📍 Location tracking started! Restaurants will update automatically.');
  };

  // Stop watching location changes
  const stopLocationWatching = () => {
    if (locationWatcher) {
      navigator.geolocation.clearWatch(locationWatcher);
      setLocationWatcher(null);
      toast.info('📍 Location tracking stopped.');
    }
  };

  const value = {
    userLocation,
    deliveryAddress,
    nearbyRestaurants,
    currentCity,
    isLoadingLocation,
    locationPermission,
    locationWatcher,
    getCurrentLocation,
    startLocationWatching,
    stopLocationWatching,
    getNearbyRestaurants,
    setDeliveryAddressManually,
    isInDeliveryRange,
    getEstimatedDeliveryTime,
    calculateDistance
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}; 