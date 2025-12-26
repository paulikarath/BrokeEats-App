
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { cheapRecipes } from '../data/recipes';
import { Recipe } from '../types/Recipe';
import Icon from '../components/Icon';

export default function RecipesScreen() {
  const { budget, days } = useLocalSearchParams<{ budget: string; days: string }>();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [dailyBudget, setDailyBudget] = useState(0);

  useEffect(() => {
    console.log('Recipes screen loaded with budget:', budget, 'days:', days);
    
    if (budget && days) {
      const budgetNum = parseFloat(budget);
      const daysNum = parseInt(days);
      const daily = budgetNum / daysNum;
      setDailyBudget(daily);

      // Filter recipes that fit within daily budget
      const affordableRecipes = cheapRecipes.filter(recipe => 
        recipe.estimatedCost <= daily * 1.5 // Allow some flexibility
      );

      // Select recipes to fill the days
      const selected: Recipe[] = [];
      let currentDay = 0;
      
      while (currentDay < daysNum && affordableRecipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * affordableRecipes.length);
        selected.push(affordableRecipes[randomIndex]);
        currentDay++;
      }

      setSelectedRecipes(selected);
    }
  }, [budget, days]);

  const getTotalCost = () => {
    return selectedRecipes.reduce((total, recipe) => total + recipe.estimatedCost, 0);
  };

  const handleRecipePress = (recipe: Recipe) => {
    console.log('Recipe pressed:', recipe.name);
    router.push({
      pathname: '/recipe-detail',
      params: { recipeId: recipe.id }
    });
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={{ 
              padding: 8, 
              marginRight: 12,
              backgroundColor: colors.backgroundAlt,
              borderRadius: 8
            }}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={commonStyles.title}>Your Meal Plan</Text>
          </View>
        </View>

        {/* Budget Summary */}
        <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 24 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={[commonStyles.text, { color: colors.background, fontWeight: '600' }]}>
                Budget: ${budget}
              </Text>
              <Text style={[commonStyles.textLight, { color: colors.background, opacity: 0.8 }]}>
                ${dailyBudget.toFixed(2)} per day for {days} days
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[commonStyles.text, { color: colors.background, fontWeight: '600' }]}>
                Total Cost: ${getTotalCost().toFixed(2)}
              </Text>
              <Text style={[commonStyles.textLight, { color: colors.background, opacity: 0.8 }]}>
                Savings: ${(parseFloat(budget || '0') - getTotalCost()).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Recipe List */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          Recommended Recipes
        </Text>

        {selectedRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={recipe.id}
            style={[commonStyles.card, { marginBottom: 16 }]}
            onPress={() => handleRecipePress(recipe)}
          >
            <View style={{ flexDirection: 'row' }}>
              {recipe.image && (
                <Image
                  source={{ uri: recipe.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    marginRight: 16
                  }}
                  resizeMode="cover"
                />
              )}
              
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Text style={[commonStyles.subtitle, { flex: 1, marginBottom: 0 }]}>
                    Day {index + 1}: {recipe.name}
                  </Text>
                  <Text style={[commonStyles.text, { color: colors.success, fontWeight: '600' }]}>
                    ${recipe.estimatedCost.toFixed(2)}
                  </Text>
                </View>
                
                <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
                  {recipe.description}
                </Text>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 }}>
                    <Icon name="time" size={16} color={colors.textLight} />
                    <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12 }]}>
                      {recipe.cookTime}min
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 }}>
                    <Icon name="people" size={16} color={colors.textLight} />
                    <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12 }]}>
                      {recipe.servings} servings
                    </Text>
                  </View>
                  
                  <View style={{
                    backgroundColor: colors.backgroundAlt,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 12,
                    marginBottom: 4
                  }}>
                    <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                      {recipe.difficulty}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {selectedRecipes.length === 0 && (
          <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
            <Icon name="restaurant" size={48} color={colors.textLight} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              No recipes found for your budget
            </Text>
            <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
              Try increasing your budget or reducing the number of days
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
