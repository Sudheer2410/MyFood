const express = require('express');
const router = express.Router();
const axios = require('axios');

// Food API configuration
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

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
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80',
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

// Get random recipes (menu items)
router.get('/random', async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    
    if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'your_spoonacular_api_key_here') {
      console.log('Using fallback data - please add your Spoonacular API key');
      return res.json(fallbackMenuItems);
    }

    const response = await axios.get(
      `${BASE_URL}/random?apiKey=${SPOONACULAR_API_KEY}&number=${limit}&tags=main course`
    );
    
    const recipes = response.data.recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      description: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      price: Math.floor(Math.random() * 20) + 10 + 0.99,
      image: recipe.image,
      cuisineType: recipe.cuisines[0] || 'International',
      tags: recipe.dishTypes || [],
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      nutrition: {
        calories: recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 300,
        protein: recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount + 'g' || '15g',
        carbs: recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount + 'g' || '45g',
        fat: recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount + 'g' || '12g'
      }
    }));

    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.json(fallbackMenuItems);
  }
});

// Search recipes by query
router.get('/search', async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;
    
    if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'your_spoonacular_api_key_here') {
      console.log('Using fallback data - please add your Spoonacular API key');
      const filteredItems = fallbackMenuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      return res.json(filteredItems);
    }

    const response = await axios.get(
      `${BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&number=${limit}&addRecipeInformation=true`
    );
    
    const recipes = response.data.results.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      description: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      price: Math.floor(Math.random() * 20) + 10 + 0.99,
      image: recipe.image,
      cuisineType: recipe.cuisines[0] || 'International',
      tags: recipe.dishTypes || [],
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      nutrition: {
        calories: recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 300,
        protein: recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount + 'g' || '15g',
        carbs: recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount + 'g' || '45g',
        fat: recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount + 'g' || '12g'
      }
    }));

    res.json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error);
    const filteredItems = fallbackMenuItems.filter(item => 
      item.name.toLowerCase().includes(req.query.query.toLowerCase()) ||
      item.description.toLowerCase().includes(req.query.query.toLowerCase())
    );
    res.json(filteredItems);
  }
});

// Get recipes by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const { cuisine } = req.params;
    const limit = req.query.limit || 20;
    
    if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'your_spoonacular_api_key_here') {
      console.log('Using fallback data - please add your Spoonacular API key');
      const filteredItems = fallbackMenuItems.filter(item => 
        item.cuisineType.toLowerCase() === cuisine.toLowerCase()
      );
      return res.json(filteredItems);
    }

    const response = await axios.get(
      `${BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&cuisine=${cuisine}&number=${limit}&addRecipeInformation=true`
    );
    
    const recipes = response.data.results.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      description: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      price: Math.floor(Math.random() * 20) + 10 + 0.99,
      image: recipe.image,
      cuisineType: recipe.cuisines[0] || 'International',
      tags: recipe.dishTypes || [],
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      nutrition: {
        calories: recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 300,
        protein: recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount + 'g' || '15g',
        carbs: recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount + 'g' || '45g',
        fat: recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount + 'g' || '12g'
      }
    }));

    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes by cuisine:', error);
    const filteredItems = fallbackMenuItems.filter(item => 
      item.cuisineType.toLowerCase() === req.params.cuisine.toLowerCase()
    );
    res.json(filteredItems);
  }
});

// Get recipe by ID
router.get('/recipe/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY === 'your_spoonacular_api_key_here') {
      console.log('Using fallback data - please add your Spoonacular API key');
      const recipe = fallbackMenuItems.find(item => item.id === parseInt(id));
      return res.json(recipe || fallbackMenuItems[0]);
    }

    const response = await axios.get(
      `${BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    );
    
    const recipe = response.data;
    const formattedRecipe = {
      id: recipe.id,
      name: recipe.title,
      description: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      price: Math.floor(Math.random() * 20) + 10 + 0.99,
      image: recipe.image,
      cuisineType: recipe.cuisines[0] || 'International',
      tags: recipe.dishTypes || [],
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      nutrition: {
        calories: recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 300,
        protein: recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount + 'g' || '15g',
        carbs: recipe.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount + 'g' || '45g',
        fat: recipe.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount + 'g' || '12g'
      }
    };

    res.json(formattedRecipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    const recipe = fallbackMenuItems.find(item => item.id === parseInt(req.params.id));
    res.json(recipe || fallbackMenuItems[0]);
  }
});

module.exports = router; 