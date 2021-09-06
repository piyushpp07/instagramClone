import React from 'react';
import firebase from 'firebase/app';
import { View, Text } from 'react-native';
import Register from './Components/auth/Register';
const firebaseConfig = {
  apiKey: "AIzaSyDzx77dioJ3IWsb2CYFDNlAf2kPTPpoBRk",
  authDomain: "autht-8647f.firebaseapp.com",
  projectId: "autht-8647f",
  storageBucket: "autht-8647f.appspot.com",
  messagingSenderId: "244082703409",
  appId: "1:244082703409:web:31b709dc49599ac0c26910"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './Components/auth/Landing';
import { render } from 'react-dom';
import Login from './Components/auth/Login';
const Stack = createStackNavigator();
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loaded: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }


  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>
            Loading
          </Text>
        </View>
      )
    }
    if (!loggedIn) {

      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing"  >
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer >

      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Logged In</Text>
      </View>
    )
  }
}

