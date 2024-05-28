// In App.js in a new project

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const apikey= 'AIzaSyAapJfrfXi7d8OOsnv6cCdETs65FlpXp6M';
export const googleSignin = async () => {
  try {
    GoogleSignin.configure({
      webClientId:apikey ,
      scopes: ['profile', 'email'],
      offlineAccess: false,
    });
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error) {
    console.log('=> Google sign in', error);
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        // user cancelled the login flow
        break;
      case statusCodes.IN_PROGRESS:
        // operation (eg. sign in) already in progress
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // play services not available or outdated
        break;
      default:
  }
};
}

function HomeScreen() {
  const naviagtion = useNavigation();

  const signIn = async () => {
    googleSignin()
      .then(data => {
        if (!data) {
          console.log('Faliure');
          return;
        } else {
          naviagtion.navigate('Details');
        }
      })
      .catch(error => {
        console.log(error, 'error on google signins');
      });
  };
  return (
    <View style={styles.homeRoot}>
      <Tex style={styles.homeText}>Home Screen</Text>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={styles.homeRoot}>
      <Tex style={styles.homeText}>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  homeRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  homeText:{
    color:"black"
  }
})
