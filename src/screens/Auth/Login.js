import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initState = {
  userInfo: {},
  isLoginScreenPresented: false,
  currentUser: '',
  isSigninInProgress: false,
};

const Login = ({navigation}) => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setState({isLoginScreenPresented: !isSignedIn});
  };

  const signIn = async () => {
    GoogleSignin.configure({
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '855607739249-dl73634foqtb07garnris5hcqg6nt5ed.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        navigation.navigate('Home');
      }
      setState({userInfo});
      try {
        AsyncStorage.setItem('user', JSON.stringify(userInfo));
      } catch (e) {
        console.error(e);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancel');
        setState({isSigninInProgress: false});
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setState({isSigninInProgress: true});
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setState({isSigninInProgress: true});
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    setState({currentUser});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={state.isSigninInProgress}
        style={styles.btn}
        onPress={() => signIn()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon
            style={{marginRight: 20}}
            name="google"
            size={25}
            color="#fff"
          />
          <Text style={styles.btnText}>Sign In with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#413174',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#756B96',
    width: SCREEN_WIDTH * 0.8,
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {fontWeight: 'bold', fontSize: 20, color: '#fff'},
});
