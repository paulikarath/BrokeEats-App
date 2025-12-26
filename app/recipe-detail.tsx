
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { cheapRecipes } from '../data/recipes';
import { Recipe } from '../types/Recipe';
import Icon from '../components/Icon';

export default function RecipeDetailScreen() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    console.log('Recipe detail screen loaded with ID:', recipeId);
    
    if (recipeId) {
      const foundRecipe = cheapRecipes.find(r => r.id === recipeId);
      setRecipe(foundRecipe || null);
    }
  }, [recipeId]);

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  if (!recipe) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Recipe not found</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={[commonStyles.title, { fontSize: 24 }]}>Recipe Details</Text>
          </View>
        </View>

        {/* Recipe Image */}
        {recipe.image && (
          <Image
            source={{ uri: recipe.image }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 16,
              marginBottom: 20
            }}
            resizeMode="cover"
          />
        )}

        {/* Recipe Title and Info */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 8 }]}>
            {recipe.name}
          </Text>
          
          <Text style={[commonStyles.textLight, { marginBottom: 16 }]}>
            {recipe.description}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Icon name="time" size={24} color={colors.primary} />
              <Text style={[commonStyles.textLight, { marginTop: 4, fontSize: 12 }]}>
                {recipe.cookTime} min
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Icon name="people" size={24} color={colors.secondary} />
              <Text style={[commonStyles.textLight, { marginTop: 4, fontSize: 12 }]}>
                {recipe.servings} servings
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Icon name="cash" size={24} color={colors.success} />
              <Text style={[commonStyles.textLight, { marginTop: 4, fontSize: 12 }]}>
                ${recipe.estimatedCost.toFixed(2)}
              </Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Icon name="star" size={24} color={colors.warning} />
              <Text style={[commonStyles.textLight, { marginTop: 4, fontSize: 12 }]}>
                {recipe.difficulty}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {recipe.tags.map((tag, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.backgroundAlt,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ingredients */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="basket" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Ingredients
            </Text>
          </View>
          
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.primary,
                marginRight: 12
              }} />
              <Text style={commonStyles.text}>
                {ingredient}
              </Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={[commonStyles.card, { marginBottom: 40 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="list" size={24} color={colors.secondary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Instructions
            </Text>
          </View>
          
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                marginTop: 2
              }}>
                <Text style={[commonStyles.text, { color: colors.background, fontSize: 12, fontWeight: '600' }]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={[commonStyles.text, { flex: 1, lineHeight: 22 }]}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
