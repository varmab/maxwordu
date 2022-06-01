import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import HelpScreen from './screens/HelpScreen';
import PlayScreen from './screens/PlayScreen';
import OptionsScreen from './screens/OptionScree';
import EndGameScreen from './screens/EndGameScreen';
import MyScoresScreen from './screens/MyScoresScreen';
import TopScoresScreen from './screens/TopScoresScreen';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        options={{ header: () => null, gestureEnabled: false }}
        component={MainScreen}
      />
      <Stack.Screen
        name="Help"
        options={{ header: () => null, gestureEnabled: false }}
        component={HelpScreen}
      />
       <Stack.Screen
        name="PlayNow"
        options={{ header: () => null, gestureEnabled: false }}
        component={PlayScreen}
      />
       <Stack.Screen
        name="Options"
        options={{ header: () => null, gestureEnabled: false }}
        component={OptionsScreen}
      />
       <Stack.Screen
        name="End Game"
        options={{ header: () => null, gestureEnabled: false }}
        component={EndGameScreen}
      />
        <Stack.Screen
        name="MyScores"
        options={{ header: () => null, gestureEnabled: false }}
        component={MyScoresScreen}
      />
        <Stack.Screen
        name="TopScores"
        options={{ header: () => null, gestureEnabled: false }}
        component={TopScoresScreen}
      />
    </Stack.Navigator>
  );
}
export default MainStack;
