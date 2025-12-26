
import { Recipe } from '../types/Recipe';

export const cheapRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Basic Rice and Beans',
    description: 'A protein-packed, filling meal that costs under $1 per serving',
    ingredients: ['1 cup white rice', '1 can black beans', '1 onion', 'garlic', 'cumin', 'salt'],
    instructions: [
      'Cook rice according to package directions',
      'Sauté diced onion and garlic',
      'Add beans, cumin, and salt',
      'Serve over rice'
    ],
    estimatedCost: 0.85,
    servings: 4,
    cookTime: 25,
    difficulty: 'Easy',
    tags: ['vegetarian', 'protein', 'filling'],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  {
    id: '2',
    name: 'Pasta with Garlic Oil',
    description: 'Simple Italian pasta dish with just a few ingredients',
    ingredients: ['1 lb pasta', '6 cloves garlic', '1/2 cup olive oil', 'red pepper flakes', 'parmesan'],
    instructions: [
      'Cook pasta until al dente',
      'Heat olive oil and sauté sliced garlic',
      'Add red pepper flakes',
      'Toss with pasta and parmesan'
    ],
    estimatedCost: 1.20,
    servings: 4,
    cookTime: 15,
    difficulty: 'Easy',
    tags: ['vegetarian', 'quick', 'italian'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400'
  },
  {
    id: '3',
    name: 'Egg Fried Rice',
    description: 'Transform leftover rice into a delicious meal',
    ingredients: ['2 cups cooked rice', '3 eggs', '2 green onions', 'soy sauce', 'vegetable oil'],
    instructions: [
      'Heat oil in large pan',
      'Scramble eggs and set aside',
      'Fry rice until heated through',
      'Add eggs back in with soy sauce and green onions'
    ],
    estimatedCost: 0.95,
    servings: 2,
    cookTime: 10,
    difficulty: 'Easy',
    tags: ['quick', 'protein', 'leftover-friendly'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'
  },
  {
    id: '4',
    name: 'Lentil Soup',
    description: 'Hearty and nutritious soup perfect for cold days',
    ingredients: ['1 cup red lentils', '1 onion', '2 carrots', '2 celery stalks', 'vegetable broth', 'bay leaves'],
    instructions: [
      'Sauté diced vegetables',
      'Add lentils and broth',
      'Simmer for 20 minutes',
      'Season with salt and pepper'
    ],
    estimatedCost: 1.10,
    servings: 6,
    cookTime: 30,
    difficulty: 'Easy',
    tags: ['vegetarian', 'healthy', 'soup'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
  },
  {
    id: '5',
    name: 'Peanut Butter Sandwich',
    description: 'Classic protein-rich sandwich',
    ingredients: ['2 slices bread', '2 tbsp peanut butter', '1 tbsp jelly (optional)'],
    instructions: [
      'Spread peanut butter on one slice',
      'Add jelly if desired',
      'Close sandwich and enjoy'
    ],
    estimatedCost: 0.45,
    servings: 1,
    cookTime: 2,
    difficulty: 'Easy',
    tags: ['quick', 'protein', 'no-cook'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
  },
  {
    id: '6',
    name: 'Baked Potato with Toppings',
    description: 'Filling potato with budget-friendly toppings',
    ingredients: ['1 large potato', 'butter', 'salt', 'pepper', 'cheese (optional)', 'green onions'],
    instructions: [
      'Bake potato at 425°F for 45 minutes',
      'Cut open and fluff with fork',
      'Add butter, salt, pepper',
      'Top with cheese and green onions'
    ],
    estimatedCost: 0.75,
    servings: 1,
    cookTime: 50,
    difficulty: 'Easy',
    tags: ['vegetarian', 'filling', 'customizable'],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'
  },
  {
    id: '7',
    name: 'Ramen Upgrade',
    description: 'Transform instant ramen into a proper meal',
    ingredients: ['1 pack instant ramen', '1 egg', 'green onions', 'sriracha', 'sesame oil'],
    instructions: [
      'Cook ramen according to package',
      'Add beaten egg in last minute',
      'Top with green onions',
      'Drizzle with sriracha and sesame oil'
    ],
    estimatedCost: 0.65,
    servings: 1,
    cookTime: 5,
    difficulty: 'Easy',
    tags: ['quick', 'protein', 'spicy'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400'
  },
  {
    id: '8',
    name: 'Bean and Cheese Quesadilla',
    description: 'Crispy tortilla filled with beans and cheese',
    ingredients: ['2 flour tortillas', '1/2 cup refried beans', '1/2 cup shredded cheese', 'salsa'],
    instructions: [
      'Spread beans on one tortilla',
      'Add cheese and top with second tortilla',
      'Cook in pan until crispy and cheese melts',
      'Serve with salsa'
    ],
    estimatedCost: 0.90,
    servings: 1,
    cookTime: 8,
    difficulty: 'Easy',
    tags: ['vegetarian', 'quick', 'mexican'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'
  }
];

export const pantryIngredients = [
  { id: '1', name: 'Rice', category: 'Grains', selected: false },
  { id: '2', name: 'Pasta', category: 'Grains', selected: false },
  { id: '3', name: 'Bread', category: 'Grains', selected: false },
  { id: '4', name: 'Oats', category: 'Grains', selected: false },
  { id: '5', name: 'Black Beans', category: 'Protein', selected: false },
  { id: '6', name: 'Lentils', category: 'Protein', selected: false },
  { id: '7', name: 'Eggs', category: 'Protein', selected: false },
  { id: '8', name: 'Peanut Butter', category: 'Protein', selected: false },
  { id: '9', name: 'Cheese', category: 'Dairy', selected: false },
  { id: '10', name: 'Milk', category: 'Dairy', selected: false },
  { id: '11', name: 'Onions', category: 'Vegetables', selected: false },
  { id: '12', name: 'Garlic', category: 'Vegetables', selected: false },
  { id: '13', name: 'Carrots', category: 'Vegetables', selected: false },
  { id: '14', name: 'Potatoes', category: 'Vegetables', selected: false },
  { id: '15', name: 'Olive Oil', category: 'Pantry', selected: false },
  { id: '16', name: 'Salt', category: 'Pantry', selected: false },
  { id: '17', name: 'Pepper', category: 'Pantry', selected: false },
  { id: '18', name: 'Soy Sauce', category: 'Pantry', selected: false },
];
