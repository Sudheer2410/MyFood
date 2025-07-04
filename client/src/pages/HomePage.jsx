import React from 'react';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', count: '150+ places' },
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', count: '120+ places' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80', count: '80+ places' },
  { name: 'Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', count: '90+ places' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80', count: '60+ places' },
  { name: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80', count: '200+ places' },
];

const trendingRestaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian • Pizza',
    rating: 4.5,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    price: '$$',
    tags: ['Popular', 'Fast Delivery']
  },
  {
    id: 2,
    name: 'Burger House',
    cuisine: 'American • Burgers',
    rating: 4.3,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    price: '$',
    tags: ['Trending']
  },
  {
    id: 3,
    name: 'Sushi Master',
    cuisine: 'Japanese • Sushi',
    rating: 4.7,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
    price: '$$$',
    tags: ['Premium']
  },
  {
    id: 4,
    name: 'Pasta Corner',
    cuisine: 'Italian • Pasta',
    rating: 4.2,
    deliveryTime: '25-40 min',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    price: '$$',
    tags: ['New']
  }
];

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 px-2 sm:px-4 md:px-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 sm:p-6 pt-16 text-white overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="relative z-10 max-w-xl mt-12">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">Hungry? We've got you covered</h1>
          <p className="text-lg sm:text-xl mb-6 opacity-90">Order from your favorite restaurants and get it delivered to your doorstep</p>
          <button
            className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto"
            onClick={() => navigate('/menu')}
          >
            Order Now
          </button>
        </div>
        <div className="absolute right-0 top-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 sm:-mr-32 sm:-mt-32"></div>
        <div className="absolute right-8 top-8 w-20 h-20 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full"></div>
      </div>

      {/* Categories Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Categories</h2>
          <button className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-1">
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category) => (
            <div key={category.name} className="text-center group cursor-pointer">
              <div className="relative mb-2 sm:mb-3">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-20 sm:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition"></div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{category.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{category.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Restaurants */}
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Trending Restaurants</h2>
          <button className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-1">
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col h-full">
              <div className="relative">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap">
                  {restaurant.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{restaurant.name}</h3>
                  <span className="text-xs sm:text-sm text-gray-500">{restaurant.price}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Get 50% OFF</h2>
            <p className="text-base sm:text-lg opacity-90 mb-4">On your first order with code: WELCOME50</p>
            <button className="bg-white text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto">
              Order Now
            </button>
          </div>
          <div className="hidden md:block flex-1">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-20 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 