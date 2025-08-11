import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SparkleIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = {
  deepBlue: '#16162C',
  buttonPurple: '#473F71',
  buttonGrey: '#4A4A4A',
  white: '#FFFFFF',
  textLight: '#F0F0F0',
  textGray: '#808080',
  black: '#000000',
  gradientTop: '#1E3A8A',
  gradientBottom: '#100E21',
  cardTop: '#2B4A9A',
  accentlightgrey: '#a29bfe',
};

const dotColors = [
  '#d0d3f9', '#babdf7', '#a0a3f6', '#8687f5',
  '#7677f4', '#696ae5', '#5f63cb', '#47486d',
];

// Dot Spinner Component
const DotSpinner = ({ size = 8, dotSize = 12, style }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: t => t,
      })
    ).start();
  }, []);

  const dots = Array.from({ length: dotColors.length }).map((_, i) => {
    const angle = (2 * Math.PI * i) / dotColors.length;
    const radius = (size - dotSize) / 1.4;
    return (
      <View
        key={i}
        style={{
          position: 'absolute',
          left: size / 2 + radius * Math.cos(angle) - (dotSize - i * 1.2) / 2,
          top: size / 2 + radius * Math.sin(angle) - (dotSize - i * 1.2) / 2,
        }}
      >
        <View
          style={{
            width: dotSize - i * 1.2,
            height: dotSize - i * 1.2,
            borderRadius: (dotSize - i * 1.2) / 2,
            backgroundColor: dotColors[i],
            opacity: 1 - i * 0.10,
          }}
        />
      </View>
    );
  });

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[
      {
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: spin }],
      },
      style,
    ]}>
      {dots}
    </Animated.View>
  );
};

// Main Screen
const PromptScreen = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('Leisure Mode');
  const [isLoading, setIsLoading] = useState(false);
  const modes = ['Romantic Mode', 'Leisure Mode', 'Collaboration Mode'];

  // Animated value for the curate button width
  const buttonWidth = useRef(new Animated.Value(1)).current; 

  const handleCuratePress = () => {
    Animated.timing(buttonWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsLoading(true);

    setTimeout(() => {
      navigation.navigate('Results');
      setIsLoading(false);
      buttonWidth.setValue(1);
    }, 3000);
  };

  const animatedWidth = buttonWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['60%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.gradientTop, colors.gradientBottom]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)']}
              style={styles.backButtonGradient}
            >
              <View style={styles.backButtonInner}>
                <Icon name="arrow-back" size={24} color={colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Prompt you way to{'\n'}Your People
          </Text>
          <View style={{ width: 44 }} />
        </View>

        {/* PROMPT CARD */}
        <LinearGradient
          colors={[colors.cardTop, colors.gradientBottom]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promptCard}>
          <Text style={styles.promptText}>
            Someone who loves{'\n'}
            to talk about{'\n'}
            Quantum Physics and{'\n'}
            psychology stuff.
          </Text>
        </LinearGradient>

        <Text style={styles.intentionText}>
          Choose a mode to match your intention..
        </Text>

        {/* MODE BUTTONS */}
        <View style={styles.modeContainer}>
          {modes.map(mode => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeButton,
                selectedMode === mode && styles.modeButtonSelected,
              ]}
              onPress={() => setSelectedMode(mode)}>
              <Text
                style={[
                  styles.modeButtonText,
                  selectedMode === mode && styles.modeButtonTextSelected,
                ]}>
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        {/* CURATE BUTTON WITH ANIMATED WIDTH */}
        <Animated.View style={{ width: animatedWidth, alignSelf: 'center' }}>
          <TouchableOpacity style={styles.curateButton} onPress={handleCuratePress}>
            <SparkleIcon name="creation" size={22} color={colors.deepBlue} />
            <Text style={styles.curateButtonText}>Curate People</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          {isLoading ? (
            <DotSpinner size={48} dotSize={17} style={{ alignSelf: 'center' }} />
          ) : (
            <Text style={styles.footerText}>
              Finding your vibe-matched people...
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// STYLES
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.gradientBottom,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButtonGradient: {
    borderRadius: 14,
    padding: 1.5,
  },
  backButtonInner: {
    backgroundColor: colors.gradientTop,
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  promptCard: {
    padding: 30,
    borderRadius: 30,
    marginTop: 20,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.accentlightgrey, 
    borderWidth: 0.2
  },
  promptText: {
    color: colors.textLight,
    fontSize: 20,
    textAlign: 'left', 
  },
  intentionText: {
    color: colors.textGray,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  modeContainer: {
    marginTop: 20,
    gap: 15,
    alignItems: 'center',
  },
  modeButton: {
    width: '60%',
    backgroundColor: colors.buttonGrey,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    borderColor: colors.accentlightgrey, 
    borderWidth: 0.3
  },
  modeButtonSelected: {
    backgroundColor: colors.white,
  },
  modeButtonText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 13,
  },
  modeButtonTextSelected: {
    color: colors.black,
  },
  curateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 18,
    
    borderRadius: 16,
    gap: 8,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderColor: colors.accentlightgrey,
    borderWidth: 0.4
  },
  footerContainer: {
    paddingBottom:5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    color: colors.textGray,
    fontSize: 12,
  },
  curateButtonText: {
    color: colors.deepBlue,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PromptScreen;
