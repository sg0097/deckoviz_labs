import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const colors = {
  deepBlue: '#16162C',
  white: '#FFFFFF',
  accentlightgrey: '#a29bfe',
  buttonGradient: ['#8A2387', '#E94057', '#F27121'],
};

const GALAXY_BACKGROUND = require('../assets/ff.jpg');
const HEART_IMAGE = require('../assets/hear2.jpg');

const MatchSuccessScreen = ({ navigation }) => {
    useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('YourMatches');
    }, 4000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigation]);
  return (
    <ImageBackground source={GALAXY_BACKGROUND} style={styles.safeArea}>
      <SafeAreaView style={styles.container}>
        
                    
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.content}>
          <Text style={styles.title}>And we have a match!</Text>

          <View style={styles.matchContainer}>
            <View style={[styles.profile, { marginTop: -20 }]}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=Emma Carter' }} style={styles.avatar} />
              <Text style={styles.name}>Emma Carter, 28</Text>
              <Text style={styles.location}>New York, Ny</Text>
            </View>
            <Image source={HEART_IMAGE} style={styles.heart} />
            <View style={[styles.profile, { marginTop: 140 }]}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=James Wilson' }} style={styles.avatar} />
              <Text style={styles.name}>James Wilson, 32</Text>
              <Text style={styles.location}>New York, Ny</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.primaryButton, styles.buttonRow]}>
            <Icon
              name="chatbubble-ellipses-outline"
              size={20}
              color={colors.white}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.primaryButtonText}>Send a Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, styles.buttonRow]}>
            <Icon
              name="person-outline"
              size={20}
              color="black"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.secondaryButtonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('YourMatches')}>
            <Text style={styles.exploreText}>Keep Exploring ≫</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {  
    flex: 1 
},
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
},
  backButton: { 
    position: 'absolute', 
    top: 20, 
    left: 20, 
    zIndex: 1 ,
    padding: 10, 
    borderRadius: 8,
    borderColor: colors.accentlightgrey, 
    borderWidth: 0.4
},
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
  title: { 
    fontSize: 20, 
    color: colors.white, 
    marginBottom: -10 
},
  matchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: 220,
  },
  profile: { 
    alignItems: 'center', 
    marginHorizontal: 10 
},
  avatar: { 
    width: 110,
    height: 110, 
    borderRadius: 60, 
    borderWidth: 3,
    borderColor: colors.white,
  },
  name: { 
    fontSize: 14, 
    color: colors.white, 
    marginTop: 10 
},
  location: { 
    fontSize: 12, 
    color: colors.white, 
    opacity: 0.8 
},
  heart: { 
    width: 100, 
    height:100, 
    marginHorizontal: -14, 
    zIndex: 1 
},
  footer: { 
    paddingBottom: 120 
},
  buttonRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: 300,   
    height: 55,
    marginHorizontal:10,  
},
  primaryButton: { 
    backgroundColor: '#5A4FCF', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 15 
},
  primaryButtonText: { 
    color: colors.white, 
    fontSize: 14, 
    fontWeight: 'bold' 
},
  secondaryButton: { 
    backgroundColor: colors.white, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center'
},
  secondaryButtonText: { 
    color: '#000', 
    fontSize: 14, 
    fontWeight: 'bold' 
},
  exploreText: { 
    color: colors.white, 
    textAlign: 'center', 
    marginTop: 20, 
    opacity: 0.8 
},
});

export default MatchSuccessScreen;
