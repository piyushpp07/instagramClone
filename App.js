import React from 'react';
import firebase from 'firebase/app';
import { View, Text } from 'react-native';

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

