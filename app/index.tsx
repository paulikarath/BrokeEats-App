import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');

  const handlePlanMeals = () => {
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
    router.push('/pantry');
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: '#F8FAFC' }]}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header Section - Modernized */}
        <View style={styles.headerSection}>
          <View style={styles.iconCircle}>
            <Text style={{ fontSize: 40 }}>🍜</Text>
          </View>
          <Text style={styles.mainTitle}>Broke Eats</Text>
          <Text style={styles.tagline}>Smart meal planning for student budgets</Text>
        </View>

        {/* Budget Planning Card */}
        <View style={[commonStyles.card, styles.premiumCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary + '15' }]}>
              <Icon name="calculator" size={22} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>Plan Your Week</Text>
          </View>
          
          <Text style={styles.cardDescription}>
            Enter your total budget to see affordable recipe matches.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Budget ($)</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g., 20"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration (Days)</Text>
            <TextInput
              style={styles.modernInput}
              placeholder="e.g., 7"
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <TouchableOpacity
            style={[buttonStyles.primary, styles.shadowBtn]}
            onPress={handlePlanMeals}
          >
            <Text style={styles.buttonText}>Find My Meals</Text>
          </TouchableOpacity>
        </View>

        {/* Pantry Mode - Secondary Card */}
        <TouchableOpacity 
          style={[commonStyles.card, styles.pantryCard]} 
          onPress={handlePantryMode}
          activeOpacity={0.9}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.pantryTitle}>Pantry Mode</Text>
            <Text style={styles.pantrySub}>Use what you already have</Text>
          </View>
          <View style={styles.pantryIcon}>
             <Icon name="basket" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsHeader}>💡 Budget Pro-Tips</Text>
          <View style={styles.tipsGrid}>
             <Text style={styles.tipText}>• Buy bulk staples (rice/pasta)</Text>
             <Text style={styles.tipText}>• Eggs are your best protein</Text>
             <Text style={styles.tipText}>• Batch cook and freeze</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Custom styles to make it look "Nicer"
const styles = StyleSheet.create({
  headerSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 35,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
  },
  premiumCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    padding: 8,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    marginLeft: 4,
  },
  modernInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#1E293B',
  },
  shadowBtn: {
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  pantryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B', // Dark slate for contrast
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  pantryTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  pantrySub: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
  pantryIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 15,
  },
  tipsContainer: {
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  tipsHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
  },
  tipsGrid: {
    backgroundColor: '#F1F5F9',
    padding: 20,
    borderRadius: 20,
  },
  tipText: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
  }
});
