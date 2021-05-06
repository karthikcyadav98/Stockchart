import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      // setState({user: null}); // Remember to remove the user from your app's state as well
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#413174',
        }}
        onPress={() => signOut()}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
