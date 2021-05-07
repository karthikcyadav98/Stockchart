import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

const Home = ({navigation}) => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      try {
        AsyncStorage.clear();
      } catch (e) {
        console.error(e);
      }

      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: 'https://reactnative.dev/'}} />
    </View>
  );
};

export default Home;
