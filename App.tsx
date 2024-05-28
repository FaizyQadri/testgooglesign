// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

export const googleSignin = async () => {
  try {
    GoogleSignin.configure({
      webClientId: 'AIzaSyAapJfrfXi7d8OOsnv6cCdETs65FlpXp6M',
      scopes: ['profile', 'email'],
      offlineAccess: false,
    });
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error) {
    console.log('=> Google sign in', error);
    // alert(JSON.stringify(error, undefined, 4), ' Logged ');
  }
};

function HomeScreen() {
  const naviagtion = useNavigation();

  const signIn = async () => {
    googleSignin()
      .then(data => {
        // console.log(JSON.stringify(data, undefined, 4), 'google soignin');
        if (!data) {
          // alert('Faliure');
          console.log('Faliure');
          return;
        } else {
          // alert("success" + data);
          // alert(JSON.stringify(data, undefined, 4))
          // console.log(data.user.email)
          naviagtion.navigate('Details');
          // navigation.navigate('ProfileRegisteration');
        }
      })
      .catch(error => {
        console.log(error, 'error on google signins');
        // alert(JSON.stringify(error, undefined, 4), ' Logged ');
      });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}>
      <Text>Home Screen</Text>

      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
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
