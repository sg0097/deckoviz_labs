import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet,View,Text,SafeAreaView,ScrollView,FlatList,TouchableOpacity,TextInput,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';


const colors = {
  deepBlue: '#16162C',
  cardBlue: '#2C284E',
  accentPurple: '#A060FF',
  white: '#FFFFFF',
  textGray: '#B0B0B0',
  accentlightgrey: '#a29bfe',
};

const mockResults = [
  { id: '1', name: 'Emma Carter', compatibility: 89 },
  { id: '2', name: 'Emma Carter', compatibility: 89 },
  { id: '3', name: 'Emma Carter', compatibility: 89 },
];

const filterChips = ['Location', 'Interests', 'Availability', 'Mutuals', 'Awards'];

const ProfileCard = ({ item, navigation }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image
        source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
        style={styles.avatar}
      />
      <View style={styles.headerText}>
        <Text style={styles.nameText}>Name: {item.name}</Text>
        <Text style={styles.occupationText}>Occupation: UX Designer</Text>
      </View>
      <View style={styles.headerIcons}>
        <Icon name="refresh" size={20} color={colors.white} />
        <Icon name="heart-outline" size={20} color={colors.white} />
        <Icon name="ellipsis-horizontal" size={20} color={colors.white} />
      </View>
    </View>

    <Text style={styles.infoText}>
      <Text style={styles.infoTitle}>Brief Info: </Text>
      Passionate about psychology, and experiences. Loves hiking and reading sci-fi novels.
    </Text>
    <Text style={styles.infoText}>
      <Text style={styles.infoTitle}>AI Insight: </Text>
      "Emma was suggested because of your shared interest in behavioral psychology, and creative problem-solving."
    </Text>

    <View style={styles.compatibilitySection}>
      <View style={{flex: 1}}>
        <Text style={styles.compatibilityText}>Compatibility score: {item.compatibility}%</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${item.compatibility}%` }]} />
        </View>
      </View>
      <TouchableOpacity 
        style={styles.connectButton}
        onPress={() => navigation.navigate('MatchSuccess')}
      >
        <Text style={styles.connectButtonText}>Connect</Text>
        <FeatherIcon name="user-plus" size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  </View>
);

const ResultsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Search */}
        <View style={styles.searchHeader}>
          <TouchableOpacity style={styles.filterI} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TextInput
            placeholder="What are you looking for ?.."
            placeholderTextColor={colors.textGray}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterIcon}>
            <Icon name="options-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Filter Label and Chips (on two lines) */}
        <View style={{ marginTop: 8, marginBottom: 4 }}>
          <Text style={styles.findPeopleText}>Find people you like based on ..</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipScroll}
          >
            {filterChips.map(chip => (
              <TouchableOpacity key={chip} style={styles.chip}>
                <Text style={styles.chipText}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results List */}
        <FlatList
          data={mockResults}
          renderItem={({ item }) => <ProfileCard item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
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
    flex: 1, 
    paddingHorizontal: 15 
  },
  searchHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    gap: 10 
  },
  searchInput: { 
    flex: 1, 
    backgroundColor: colors.cardBlue, 
    borderRadius: 8, 
    padding: 10, 
    color: colors.white 
  },
  filterIcon: { 
    backgroundColor: colors.cardBlue, 
    padding: 10, 
    borderRadius: 8,
    borderColor: colors.accentlightgrey, // Your purple border color
    borderWidth: 0.4 
  },
  filterI: { 
    padding: 10, 
    borderRadius: 8,
    borderColor: colors.accentlightgrey, // Your purple border color
    borderWidth: 0.4 
  },
  findPeopleText: {
    color: colors.white,
    marginBottom: 2,
    alignSelf: 'flex-start',
    fontSize: 13,
  },
  chipScroll: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  chip: {
    backgroundColor: colors.cardBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  chipText: { 
    color: colors.white 
  },
  card: { 
    backgroundColor: colors.cardBlue, 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 15,
   },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginBottom: 15 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  headerText: { 
    flex: 1 
  },
  nameText: { 
    color: colors.white, 
    fontWeight: 'bold' 
  },
  occupationText: { 
    color: colors.textGray, 
    fontSize: 12 
  },
  headerIcons: { 
    flexDirection: 'row', 
    gap: 15 
  },
  infoText: { 
    color: colors.textGray, 
    fontSize: 13, 
    marginBottom: 10 
  },
  infoTitle: { 
    color: colors.white, 
    fontWeight: 'bold' 
  },
  compatibilitySection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 15, 
    marginTop: 10 
  },
  compatibilityText: { 
    color: colors.white, 
    fontSize: 12, 
    marginBottom: 5 
  },
  progressBarBackground: { 
    height: 8, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    borderRadius: 4 
  },
  progressBarFill: { 
    height: 8, 
    backgroundColor: colors.accentPurple, 
    borderRadius: 4 
  },
  connectButton: { 
    flexDirection: 'row', 
    backgroundColor: colors.cardBlue, 
    paddingHorizontal: 15, 
    paddingVertical: 12, 
    borderRadius: 16, 
    alignItems: 'center', 
    gap: 5, 
    borderWidth: 0.2,                   // ← add this
  borderColor: colors.accentPurple, 
},
  connectButtonText: { 
    color: colors.white, 
    fontWeight: 'bold' 
  },
});

export default ResultsScreen;
