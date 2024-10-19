import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import KYKMenuScreen from './screens/KykMenuScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import InfoScreen from './screens/InfoScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomePage from './screens/HomePage';
import ProfilScreen from './screens/ProfilScreen';
import ChangePassword from './screens/ChangePassword';
import SabahMenuScreen from './screens/SabahMenuScreen';
import OgleMenuScreen from './screens/OgleMenuScreen';
import AksamMenuScreen from './screens/AksamMenuScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KYKMenu">
        <Stack.Screen name="KYKMenu" component={KYKMenuScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SabahMenu" component={SabahMenuScreen} />
        <Stack.Screen name="OgleMenu" component={OgleMenuScreen} />
        <Stack.Screen name="AksamMenu" component={AksamMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
