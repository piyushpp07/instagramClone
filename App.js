import React from 'react';
import firebase from 'firebase/app';
import { View, Text } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyA_K9trF0iXJ4HRKBrtpKCu6a0WE464fos",
  authDomain: "mobile-6359c.firebaseapp.com",
  projectId: "mobile-6359c",
  storageBucket: "mobile-6359c.appspot.com",
  messagingSenderId: "530505614502",
  appId: "1:530505614502:web:d3da677bd98a0e96bde067"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//screen
import Add from './Components/main/Add';
import MainScreen from './Components/Main';
import Register from './Components/auth/Register';
import LandingScreen from './Components/auth/Landing';
import Login from './Components/auth/Login';
//redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducers from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(Reducers, applyMiddleware(thunk));

const Stack = createStackNavigator();
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

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
    else if (!loggedIn) {

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
    else return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main"  >
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={Add} options={{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer >
      </Provider>
    )
  }
}

