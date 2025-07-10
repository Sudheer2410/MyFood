// Restaurant data for different cities - automatically detected based on GPS location
export const cityRestaurants = {
  // Jabalpur, Madhya Pradesh - Famous restaurants
  'jabalpur': [
    {
      id: 'jbp_1',
      name: 'Pizza Hut Jabalpur',
      cuisine: 'Italian • Pizza',
      rating: 4.3,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular', 'Famous'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Adhartal, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    },
    {
      id: 'jbp_2',
      name: 'Domino\'s Pizza Jabalpur',
      cuisine: 'Italian • Pizza',
      rating: 4.1,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Gorakhpur, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    },
    {
      id: 'jbp_3',
      name: 'KFC Jabalpur',
      cuisine: 'American • Fast Food',
      rating: 4.0,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous', 'Fast Delivery'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Wright Town, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    },
    {
      id: 'jbp_4',
      name: 'McDonald\'s Jabalpur',
      cuisine: 'American • Burgers',
      rating: 3.8,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Popular'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Adhartal, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    },
    {
      id: 'jbp_5',
      name: 'Subway Jabalpur',
      cuisine: 'American • Sandwiches',
      rating: 4.2,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Healthy'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Gorakhpur, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    },
    {
      id: 'jbp_6',
      name: 'Cafe Coffee Day Jabalpur',
      cuisine: 'Cafe • Coffee',
      rating: 4.4,
      deliveryTime: '10-20 min',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Cafe'],
      latitude: 23.1815,
      longitude: 79.9864,
      address: 'Wright Town, Jabalpur, Madhya Pradesh',
      city: 'Jabalpur',
      state: 'Madhya Pradesh'
    }
  ],

  // Mumbai - Famous restaurants
  'mumbai': [
    {
      id: 'mum_1',
      name: 'Pizza Palace Mumbai',
      cuisine: 'Italian • Pizza',
      rating: 4.5,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular', 'Famous'],
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'Bandra West, Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    {
      id: 'mum_2',
      name: 'Burger House Mumbai',
      cuisine: 'American • Burgers',
      rating: 4.3,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Trending'],
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'Andheri West, Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    {
      id: 'mum_3',
      name: 'KFC Mumbai',
      cuisine: 'American • Fast Food',
      rating: 4.2,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'Juhu, Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    {
      id: 'mum_4',
      name: 'McDonald\'s Mumbai',
      cuisine: 'American • Burgers',
      rating: 4.0,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Popular'],
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'Colaba, Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra'
    }
  ],

  // Delhi - Famous restaurants
  'delhi': [
    {
      id: 'del_1',
      name: 'Sushi Master Delhi',
      cuisine: 'Japanese • Sushi',
      rating: 4.7,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
      price: '$$$',
      tags: ['Premium', 'Famous'],
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Connaught Place, New Delhi',
      city: 'Delhi',
      state: 'Delhi'
    },
    {
      id: 'del_2',
      name: 'Pasta Corner Delhi',
      cuisine: 'Italian • Pasta',
      rating: 4.2,
      deliveryTime: '25-40 min',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['New'],
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Khan Market, New Delhi',
      city: 'Delhi',
      state: 'Delhi'
    },
    {
      id: 'del_3',
      name: 'KFC Delhi',
      cuisine: 'American • Fast Food',
      rating: 4.1,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Lajpat Nagar, New Delhi',
      city: 'Delhi',
      state: 'Delhi'
    },
    {
      id: 'del_4',
      name: 'McDonald\'s Delhi',
      cuisine: 'American • Burgers',
      rating: 3.9,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Popular'],
      latitude: 28.7041,
      longitude: 77.1025,
      address: 'Rajouri Garden, New Delhi',
      city: 'Delhi',
      state: 'Delhi'
    }
  ],

  // Bangalore - Famous restaurants
  'bangalore': [
    {
      id: 'blr_1',
      name: 'Tech Cafe Bangalore',
      cuisine: 'Cafe • Coffee',
      rating: 4.6,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular', 'Famous'],
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Koramangala, Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka'
    },
    {
      id: 'blr_2',
      name: 'Pizza Hut Bangalore',
      cuisine: 'Italian • Pizza',
      rating: 4.3,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular'],
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Indiranagar, Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka'
    },
    {
      id: 'blr_3',
      name: 'KFC Bangalore',
      cuisine: 'American • Fast Food',
      rating: 4.1,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Whitefield, Bangalore, Karnataka',
      city: 'Bangalore',
      state: 'Karnataka'
    }
  ],

  // Chennai - Famous restaurants
  'chennai': [
    {
      id: 'chn_1',
      name: 'Pizza Hut Chennai',
      cuisine: 'Italian • Pizza',
      rating: 4.2,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular'],
      latitude: 13.0827,
      longitude: 80.2707,
      address: 'T Nagar, Chennai, Tamil Nadu',
      city: 'Chennai',
      state: 'Tamil Nadu'
    },
    {
      id: 'chn_2',
      name: 'KFC Chennai',
      cuisine: 'American • Fast Food',
      rating: 4.0,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 13.0827,
      longitude: 80.2707,
      address: 'Anna Nagar, Chennai, Tamil Nadu',
      city: 'Chennai',
      state: 'Tamil Nadu'
    }
  ],

  // Hyderabad - Famous restaurants
  'hyderabad': [
    {
      id: 'hyd_1',
      name: 'Pizza Hut Hyderabad',
      cuisine: 'Italian • Pizza',
      rating: 4.3,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular'],
      latitude: 17.3850,
      longitude: 78.4867,
      address: 'Banjara Hills, Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana'
    },
    {
      id: 'hyd_2',
      name: 'KFC Hyderabad',
      cuisine: 'American • Fast Food',
      rating: 4.1,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 17.3850,
      longitude: 78.4867,
      address: 'Jubilee Hills, Hyderabad, Telangana',
      city: 'Hyderabad',
      state: 'Telangana'
    }
  ],

  // Pune - Famous restaurants
  'pune': [
    {
      id: 'pune_1',
      name: 'Pizza Hut Pune',
      cuisine: 'Italian • Pizza',
      rating: 4.2,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular'],
      latitude: 18.5204,
      longitude: 73.8567,
      address: 'Koregaon Park, Pune, Maharashtra',
      city: 'Pune',
      state: 'Maharashtra'
    },
    {
      id: 'pune_2',
      name: 'KFC Pune',
      cuisine: 'American • Fast Food',
      rating: 4.0,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Famous'],
      latitude: 18.5204,
      longitude: 73.8567,
      address: 'Camp, Pune, Maharashtra',
      city: 'Pune',
      state: 'Maharashtra'
    }
  ],

  // Default restaurants (when city not found)
  'default': [
    {
      id: 'def_1',
      name: 'Pizza Palace',
      cuisine: 'Italian • Pizza',
      rating: 4.5,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      price: '$$',
      tags: ['Popular', 'Fast Delivery'],
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Pizza Street, New York, NY',
      city: 'New York',
      state: 'NY'
    },
    {
      id: 'def_2',
      name: 'Burger House',
      cuisine: 'American • Burgers',
      rating: 4.3,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      price: '$',
      tags: ['Trending'],
      latitude: 40.7589,
      longitude: -73.9851,
      address: '456 Burger Ave, New York, NY',
      city: 'New York',
      state: 'NY'
    }
  ]
};

// Function to get restaurants for a specific city
export const getRestaurantsByCity = (cityName) => {
  const cityKey = cityName?.toLowerCase();
  
  if (cityKey && cityRestaurants[cityKey]) {
    return cityRestaurants[cityKey];
  }
  
  // Return default restaurants if city not found
  return cityRestaurants.default;
};

// Function to get city name from coordinates (enhanced for more cities)
export const getCityFromCoordinates = (latitude, longitude) => {
  // This is a simplified version. In a real app, you'd use a geocoding service
  // For now, we'll return based on approximate coordinates
  
  // Jabalpur coordinates (approximate)
  if (latitude >= 23.0 && latitude <= 23.5 && longitude >= 79.8 && longitude <= 80.2) {
    return 'jabalpur';
  }
  
  // Mumbai coordinates (approximate)
  if (latitude >= 18.9 && latitude <= 19.3 && longitude >= 72.7 && longitude <= 73.2) {
    return 'mumbai';
  }
  
  // Delhi coordinates (approximate)
  if (latitude >= 28.5 && latitude <= 29.0 && longitude >= 76.8 && longitude <= 77.3) {
    return 'delhi';
  }
  
  // Bangalore coordinates (approximate)
  if (latitude >= 12.8 && latitude <= 13.2 && longitude >= 77.4 && longitude <= 77.8) {
    return 'bangalore';
  }
  
  // Chennai coordinates (approximate)
  if (latitude >= 12.8 && latitude <= 13.4 && longitude >= 80.1 && longitude <= 80.4) {
    return 'chennai';
  }
  
  // Hyderabad coordinates (approximate)
  if (latitude >= 17.2 && latitude <= 17.6 && longitude >= 78.3 && longitude <= 78.6) {
    return 'hyderabad';
  }
  
  // Pune coordinates (approximate)
  if (latitude >= 18.4 && latitude <= 18.7 && longitude >= 73.7 && longitude <= 74.0) {
    return 'pune';
  }
  
  return 'default';
}; 