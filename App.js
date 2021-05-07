import React, {useEffect} from 'react';
import Navigation from './src/Navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {BackHandler} from 'react-native';

const App = () => {
  useEffect(() => {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        // this.props.handlePopupDismissed();
        // alert('Authenticated successfully');
      })
      .catch(error => {
        BackHandler.exitApp();
        // alert(error);
      });
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
