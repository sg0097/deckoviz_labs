import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const colors = {
  deepBlue: '#1F1C3E',
  cardBlue: '#23223B',
  accentPurple: '#6C63FF',
  tabBarBg: '#23223B',      
  tabHighlight: '#63607D', 
  white: '#FFFFFF',
  textGray: '#B0B0B0',
  accentlightgrey: '#a29bfe',
};

const TABS = ['Romantic', 'Leisure', 'Collaboration'];
const DUMMY_MATCHES = [
  { id: '1', name: 'James Wilson', age: 28, compatibility: 92 },
  { id: '2', name: 'James Wilson', age: 28, compatibility: 92 },
];
const INTEREST_TAGS = ['Design', 'Hiking', 'Music', 'Travel', 'Cooking'];

const MatchCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}, {item.age}</Text>
        <Text style={styles.location}>New York, NY</Text>
      </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>High Compatibility</Text>
      </View>
    </View>
    <Text style={styles.description}>
      Product designer at Airbnb who loves hiking, cooking new recipes, and playing piano.
    </Text>
    <View style={styles.interestsContainer}>
      {INTEREST_TAGS.map(tag => (
        <View key={tag} style={styles.interestChip}>
          <Text style={styles.interestText}>{tag}</Text>
        </View>
      ))}
    </View>
    <View style={styles.compatibilityContainer}>
      <Text style={styles.compatibilityText}>Compatibility</Text>
      <Text style={styles.compatibilityPercent}>{item.compatibility}%</Text>
    </View>
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${item.compatibility}%` }]} />
    </View>
    <View style={styles.aiInsightBox}>
      <Text style={styles.aiInsightTitle}>✚ AI Insights</Text>
      <Text style={styles.aiInsightText}>Her wellness-focused lifestyle aligns with your interest in personal growth.</Text>
    </View>
  </View>
);

const YourMatchesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Romantic');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Matches</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* horizontal tab bar */}
        <View style={styles.tabsBarWrapper}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={styles.tabBtn}
              activeOpacity={0.85}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabBtnText,
                activeTab === tab && styles.tabBtnTextActive,
              ]}>
                {tab}
              </Text>
             
              {activeTab === tab && <View style={styles.indicatorBar} />}
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={DUMMY_MATCHES}
          renderItem={({ item }) => <MatchCard item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1,
     backgroundColor: colors.deepBlue
     },
  container: { 
    flex: 1 
},
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20 
},
  headerTitle: { 
    color: colors.white, 
    fontSize: 22, 
    fontWeight: 'bold' 
},
  tabsBarWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    backgroundColor: colors.tabBarBg,
    borderRadius: 0,    
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    position: 'relative',
  },
  tabBtnText: {
    color: colors.textGray,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  tabBtnTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  indicatorBar: {
    position: 'absolute',
    bottom: 0,
    left: 18,
    right: 18,
    height: 4,
    borderRadius: 8,
    backgroundColor: colors.accentPurple,
  },
  card: {
    backgroundColor: colors.cardBlue,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
},
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 15 
},
  name: { 
    color: colors.white, 
    fontSize: 13 
},
  location: { 
    color: colors.textGray,
     fontSize: 14 
    },
  tag: { 
    backgroundColor: colors.accentPurple, 
    paddingHorizontal: 3, 
    paddingVertical: 3, 
    borderRadius: 6 
},
  tagText: { 
    color: colors.white, 
    fontSize: 10, 
    fontWeight: 'bold' 
},
  description: { 
    color: colors.textGray, 
    fontSize: 14, 
    lineHeight: 20, 
    marginBottom: 15 
},
  interestsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10, 
    marginBottom: 15 
},
  interestChip: {
     backgroundColor: 'rgba(255,255,255,0.1)', 
     paddingHorizontal: 12, 
     paddingVertical: 6, 
     borderRadius: 20,
     borderColor: colors.accentPurple,   
     borderWidth: 0.7},
  interestText: { 
    color: colors.white, 
    fontSize: 12 
},
  compatibilityContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
},
  compatibilityText: { 
    color: colors.textGray 
},
  compatibilityPercent: { 
    color: colors.white, 
    fontWeight: 'bold' 
},
  progressBarBackground: { 
    height: 8, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    borderRadius: 4, 
    marginBottom: 15 
},
  progressBarFill: { 
    height: 8, 
    backgroundColor: colors.accentPurple, 
    borderRadius: 4 
},
  aiInsightBox: { 
    backgroundColor: 'rgba(0,0,0,0.2)', 
    borderRadius: 10, 
    padding: 15 
},
  aiInsightTitle: { 
    color: colors.white, 
    fontWeight: 'bold', 
    marginBottom: 5 
},
  aiInsightText: { 
    color: colors.textGray, 
    fontSize: 13, 
    lineHeight: 18
 },
  backbutton:{
    padding: 10, 
    borderRadius: 8,
    borderColor: colors.accentlightgrey, 
    borderWidth: 0.4
  }
});

export default YourMatchesScreen;
