import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import Login from '../screens/Auth/Login';
import Home from '../screens/Home/Home';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}>
        {props => <Login {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}>
        {props => <Home {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Navigation;
