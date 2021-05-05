import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        options={{
          headerShown: false
        }}>
        {props => <Login {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Navigation
