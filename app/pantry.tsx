
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { pantryIngredients } from '../data/recipes';
import { PantryItem } from '../types/Recipe';
import Icon from '../components/Icon';

export default function PantryScreen() {
  const [ingredients, setIngredients] = useState<PantryItem[]>(pantryIngredients);

  const toggleIngredient = (id: string) => {
    console.log('Toggling ingredient:', id);
    setIngredients(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const getSelectedIngredients = () => {
    return ingredients.filter(item => item.selected);
  };

  const handleFindRecipes = () => {
    const selected = getSelectedIngredients();
    console.log('Finding recipes with ingredients:', selected.map(i => i.name));
    
    if (selected.length === 0) {
      return;
    }

    router.push({
      pathname: '/pantry-recipes',
      params: { 
        selectedIngredients: JSON.stringify(selected.map(i => i.name))
      }
    });
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    router.back();
  };

  const groupedIngredients = ingredients.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, PantryItem[]>);

  const selectedCount = getSelectedIngredients().length;

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
            <Text style={commonStyles.title}>My Pantry</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={[commonStyles.card, { marginBottom: 24 }]}>
          <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 8 }]}>
            Select the ingredients you have available
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center' }]}>
            We&apos;ll suggest recipes you can make with them
          </Text>
        </View>

        {/* Selected Count */}
        {selectedCount > 0 && (
          <View style={[commonStyles.card, { backgroundColor: colors.secondary, marginBottom: 24 }]}>
            <Text style={[commonStyles.text, { color: colors.background, textAlign: 'center', fontWeight: '600' }]}>
              {selectedCount} ingredient{selectedCount !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}

        {/* Ingredient Categories */}
        {Object.entries(groupedIngredients).map(([category, items]) => (
          <View key={category} style={{ marginBottom: 24 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
              {category}
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: item.selected ? colors.primary : colors.backgroundAlt,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: item.selected ? colors.primary : colors.border,
                    marginBottom: 8,
                  }}
                  onPress={() => toggleIngredient(item.id)}
                >
                  <Text style={{
                    color: item.selected ? colors.background : colors.text,
                    fontWeight: item.selected ? '600' : '400',
                    fontSize: 14,
                  }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Find Recipes Button */}
        {selectedCount > 0 && (
          <View style={{ marginBottom: 40 }}>
            <TouchableOpacity
              style={buttonStyles.primary}
              onPress={handleFindRecipes}
            >
              <Text style={commonStyles.buttonText}>
                Find Recipes ({selectedCount} ingredients)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
