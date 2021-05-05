import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const initState = {
  userInfo: {},
  isLoginScreenPresented: false,
  currentUser: '',
  isSigninInProgress: false
}

const Login = () => {
  const [state, setState] = useState(initState)

  useEffect(() => {
    // GoogleSignin.configure({
    //   iosClientId: '855607739249-s47r8809n34mgjjdp16oqo9vpjounvim.apps.googleusercontent.com'
    // });
    getCurrentUserInfo()
  }, [])

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setState({ userInfo });
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
    setState({ isLoginScreenPresented: !isSignedIn });
  };

  const signIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //   // google services are available
    // } catch (err) {
    //   console.error('play services are not available');
    // }

    GoogleSignin.configure({
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '855607739249-dl73634foqtb07garnris5hcqg6nt5ed.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn()
      console.log('akjhdad', userInfo)
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancel')
        setState({ isSigninInProgress: false })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setState({ isSigninInProgress: true })
        console.log('in progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setState({ isSigninInProgress: true })
        console.log('PLAY_SERVICES_NOT_AVAILABLE')
      } else {
        // some other error happened
        console.log(error)
      }
    }
  };

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    setState({ currentUser });
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => signIn()}
        disabled={state.isSigninInProgress} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#413174",
    justifyContent: 'center',
    alignItems: "center"
  }
})