
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { cheapRecipes } from '../data/recipes';
import { Recipe } from '../types/Recipe';
import Icon from '../components/Icon';

export default function PantryRecipesScreen() {
  const { selectedIngredients } = useLocalSearchParams<{ selectedIngredients: string }>();
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    console.log('Pantry recipes screen loaded with ingredients:', selectedIngredients);
    
    if (selectedIngredients) {
      const ingredientList = JSON.parse(selectedIngredients);
      setIngredients(ingredientList);

      // Find recipes that use the selected ingredients
      const matching = cheapRecipes.filter(recipe => {
        const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
        return ingredientList.some((ingredient: string) => 
          recipeIngredients.includes(ingredient.toLowerCase())
        );
      });

      // Sort by how many matching ingredients
      const sorted = matching.sort((a, b) => {
        const aMatches = ingredientList.filter((ingredient: string) =>
          a.ingredients.join(' ').toLowerCase().includes(ingredient.toLowerCase())
        ).length;
        const bMatches = ingredientList.filter((ingredient: string) =>
          b.ingredients.join(' ').toLowerCase().includes(ingredient.toLowerCase())
        ).length;
        return bMatches - aMatches;
      });

      setMatchingRecipes(sorted);
    }
  }, [selectedIngredients]);

  const getMatchingIngredients = (recipe: Recipe) => {
    return ingredients.filter(ingredient =>
      recipe.ingredients.join(' ').toLowerCase().includes(ingredient.toLowerCase())
    );
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
            <Text style={commonStyles.title}>Recipe Matches</Text>
          </View>
        </View>

        {/* Selected Ingredients Summary */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
            Your Ingredients
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {ingredients.map((ingredient, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.secondary,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text style={[commonStyles.textLight, { color: colors.background, fontSize: 12 }]}>
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recipe Results */}
        <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
          Recipes You Can Make ({matchingRecipes.length})
        </Text>

        {matchingRecipes.map((recipe) => {
          const matchingIngredients = getMatchingIngredients(recipe);
          const matchPercentage = Math.round((matchingIngredients.length / recipe.ingredients.length) * 100);
          
          return (
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
                      {recipe.name}
                    </Text>
                    <View style={{
                      backgroundColor: matchPercentage >= 70 ? colors.success : colors.warning,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                    }}>
                      <Text style={[commonStyles.textLight, { color: colors.background, fontSize: 12, fontWeight: '600' }]}>
                        {matchPercentage}% match
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
                    {recipe.description}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 }}>
                      <Icon name="time" size={16} color={colors.textLight} />
                      <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12 }]}>
                        {recipe.cookTime}min
                      </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 4 }}>
                      <Icon name="cash" size={16} color={colors.success} />
                      <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12, color: colors.success }]}>
                        ${recipe.estimatedCost.toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    You have: {matchingIngredients.join(', ')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {matchingRecipes.length === 0 && (
          <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
            <Icon name="search" size={48} color={colors.textLight} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              No recipes found
            </Text>
            <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
              Try selecting more ingredients from your pantry
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
