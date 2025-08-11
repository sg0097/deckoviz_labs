import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all your screens
import PromptScreen from '../screens/PromptScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MatchSuccessScreen from '../screens/MatchSuccessScreen'; // <-- Import new screen
import YourMatchesScreen from '../screens/YourMatchesScreen';   // <-- Import new screen

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Prompt" component={PromptScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="MatchSuccess" component={MatchSuccessScreen} />{/* <-- Add new screen */}
        <Stack.Screen name="YourMatches" component={YourMatchesScreen} />{/* <-- Add new screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;