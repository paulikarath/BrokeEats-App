
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');

  const handlePlanMeals = () => {
    console.log('Planning meals with budget:', budget, 'days:', days);
    
    if (!budget || !days) {
      Alert.alert('Missing Information', 'Please enter both budget and number of days');
      return;
    }

    const budgetNum = parseFloat(budget);
    const daysNum = parseInt(days);

    if (budgetNum <= 0 || daysNum <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid positive numbers');
      return;
    }

    router.push({
      pathname: '/recipes',
      params: { budget: budgetNum.toString(), days: daysNum.toString() }
    });
  };

  const handlePantryMode = () => {
    console.log('Opening pantry mode');
    router.push('/pantry');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
          <Text style={[commonStyles.title, { fontSize: 32, color: colors.primary }]}>
            🍜 Broke Eats
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
            Budget meal planning for students
          </Text>
        </View>

        {/* Budget Planning Card */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="calculator" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Plan Your Meals
            </Text>
          </View>
          
          <Text style={[commonStyles.textLight, { marginBottom: 20 }]}>
            Enter your budget and we&apos;ll suggest affordable recipes using cheap staples
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Total Budget ($)
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="e.g., 10"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={[commonStyles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Number of Days
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="e.g., 3"
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
              placeholderTextColor={colors.textLight}
            />
          </View>

          <TouchableOpacity
            style={buttonStyles.primary}
            onPress={handlePlanMeals}
          >
            <Text style={commonStyles.buttonText}>Find Recipes</Text>
          </TouchableOpacity>
        </View>

        {/* Pantry Mode Card */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="basket" size={24} color={colors.secondary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Pantry Mode
            </Text>
          </View>
          
          <Text style={[commonStyles.textLight, { marginBottom: 20 }]}>
            Already have ingredients? Tell us what&apos;s in your pantry and get recipe suggestions
          </Text>

          <TouchableOpacity
            style={buttonStyles.secondary}
            onPress={handlePantryMode}
          >
            <Text style={[commonStyles.buttonText, { color: colors.background }]}>
              Check My Pantry
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips Card */}
        <View style={[commonStyles.card, { marginBottom: 40 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="bulb" size={24} color={colors.warning} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Money-Saving Tips
            </Text>
          </View>
          
          <View style={{ marginLeft: 36 }}>
            <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
              • Buy rice, beans, and pasta in bulk
            </Text>
            <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
              • Eggs are cheap protein sources
            </Text>
            <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
              • Seasonal vegetables cost less
            </Text>
            <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
              • Cook in batches and freeze portions
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
