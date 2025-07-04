// Use environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://my-food-backend-i588.onrender.com';

// Fallback data in case API is not available
const fallbackMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'Italian',
    tags: ['Pizza', 'Vegetarian', 'Italian'],
    readyInMinutes: 25,
    servings: 4,
    nutrition: {
      calories: 285,
      protein: '12g',
      carbs: '35g',
      fat: '10g'
    }
  },
  {
    id: 2,
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan cheese, and caesar dressing',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'American',
    tags: ['Salad', 'Chicken', 'Healthy'],
    readyInMinutes: 20,
    servings: 2,
    nutrition: {
      calories: 320,
      protein: '28g',
      carbs: '8g',
      fat: '18g'
    }
  },
  {
    id: 3,
    name: 'Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'American',
    tags: ['Burger', 'Beef', 'Fast Food'],
    readyInMinutes: 15,
    servings: 1,
    nutrition: {
      calories: 450,
      protein: '25g',
      carbs: '35g',
      fat: '22g'
    }
  },
  {
    id: 4,
    name: 'Sushi Roll',
    description: 'Fresh salmon and avocado roll with rice and nori',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'Japanese',
    tags: ['Sushi', 'Fish', 'Healthy'],
    readyInMinutes: 30,
    servings: 2,
    nutrition: {
      calories: 280,
      protein: '15g',
      carbs: '45g',
      fat: '8g'
    }
  },
  {
    id: 5,
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with eggs, cheese, pancetta, and black pepper',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'Italian',
    tags: ['Pasta', 'Creamy', 'Italian'],
    readyInMinutes: 25,
    servings: 3,
    nutrition: {
      calories: 285,
      protein: '18g',
      carbs: '55g',
      fat: '16g'
    }
  },
  {
    id: 6,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate frosting and sprinkles',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
    cuisineType: 'Dessert',
    tags: ['Dessert', 'Chocolate', 'Sweet'],
    readyInMinutes: 45,
    servings: 8,
    nutrition: {
      calories: 380,
      protein: '6g',
      carbs: '52g',
      fat: '18g'
    }
  }
];

// API functions
export const foodApi = {
  // Get random recipes (menu items)
  async getRandomRecipes(limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/food/random?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return fallbackMenuItems;
    }
  },

  // Search recipes by query
  async searchRecipes(query, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/food/search?query=${encodeURIComponent(query)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to search recipes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      return fallbackMenuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Get recipes by cuisine type
  async getRecipesByCuisine(cuisine, limit = 20) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/food/cuisine/${encodeURIComponent(cuisine)}?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cuisine recipes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cuisine recipes:', error);
      return fallbackMenuItems.filter(item => 
        item.cuisineType.toLowerCase() === cuisine.toLowerCase()
      );
    }
  },

  // Get recipe details by ID
  async getRecipeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/food/recipe/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return fallbackMenuItems.find(item => item.id === parseInt(id));
    }
  }
};

// Update user profile
export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default foodApi; 