
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  estimatedCost: number;
  servings: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  image?: string;
}

export interface BudgetPlan {
  totalBudget: number;
  days: number;
  dailyBudget: number;
  recipes: Recipe[];
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  selected: boolean;
}
