import React, {useState, useEffect} from 'react';
import Navigation from './src/Navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {View, BackHandler} from 'react-native';

const App = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        // this.props.handlePopupDismissed();
        // alert('Authenticated successfully');
        setAuth(true);
      })
      .catch(error => {
        BackHandler.exitApp();
        // alert(error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Navigation isAuth={isAuth} />
    </NavigationContainer>
  );
};

export default App;
