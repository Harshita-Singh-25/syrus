import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { useAuth } from '../context/AuthContext';

// Static recipe data
const staticRecipes = [
  {
    id: 1,
    title: "Classic Pancakes",
    description: "Fluffy homemade pancakes perfect for breakfast",
    ingredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "2 tbsp sugar", "2 tsp baking powder"],
    instructions: "Mix dry ingredients. Add wet ingredients. Cook on griddle until golden brown.",
    cookingTime: 20,
    difficulty: "Easy",
    category: "Breakfast",
    createdBy: "system",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Vegetable Stir Fry",
    description: "Quick and healthy vegetable stir fry with amazing flavors",
    ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "1 tbsp oil", "2 cloves garlic", "1 tsp ginger"],
    instructions: "Heat oil, add garlic and ginger. Add vegetables and stir fry. Add soy sauce and serve.",
    cookingTime: 15,
    difficulty: "Easy",
    category: "Lunch",
    createdBy: "system",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    description: "Classic chocolate chip cookies that are soft and chewy",
    ingredients: ["2.25 cups flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "0.75 cup sugar", "2 eggs", "2 cups chocolate chips"],
    instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients. Bake at 375°F for 9-11 minutes.",
    cookingTime: 25,
    difficulty: "Medium",
    category: "Dessert",
    createdBy: "system",
    createdAt: new Date().toISOString()
  }
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(staticRecipes);
  const { isAuthenticated } = useAuth();

  const handleDelete = (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }
    // Local deletion only
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    console.log('Recipe deleted locally:', recipeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Recipes
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Demo: Static recipe data - changes reset on refresh
            </p>
          </div>
          {isAuthenticated && (
            <Link
              to="/create-recipe"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Add New Recipe
            </Link>
          )}
        </div>

        {/* Recipes Grid */}
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🍳</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Be the first to add a recipe!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}