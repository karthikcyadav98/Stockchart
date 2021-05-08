import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import {Avatar} from 'react-native-elements';

const Home = ({navigation, isAuth}) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('user').then(res => {
      const user = JSON.parse(res);
      setUserInfo(user.user);
    });
  }, []);

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

  if (isAuth) {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 20, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Avatar
                imageProps={{
                  backgroundColor: 'white',
                }}
                source={{uri: userInfo.photo}}
                size="medium"
                rounded
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.userText}>Welcome! {userInfo.name}</Text>
            </View>
          </View>
        </View>

        <WebView
          source={{
            uri: 'https://nameless-bayou-84803.herokuapp.com/',
          }}
        />

        <View style={{padding: 10, backgroundColor: '#fff'}}>
          <TouchableOpacity onPress={() => signOut()} style={styles.btn}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <View style={{flex: 1, backgroundColor: '#000'}} />;
  }
};

export default Home;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#413174',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {fontWeight: 'bold', color: '#fff', fontSize: 18},
  userText: {color: '#000', fontWeight: 'bold', fontSize: 30},
});
