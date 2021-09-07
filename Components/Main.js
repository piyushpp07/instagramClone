import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Profile from './main/Profile';
import Feed from './main/Feed';

const EmpyuScreen = () => {
    return (null)
}


const Tab = createMaterialBottomTabNavigator();
class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if (currentUser == undefined) {
            return (
                <View>
                    <Text>undefined</Text>
                </View>
            )
        }
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={Feed}

                    options={{
                        tabBarIcon: ({
                            color, size
                        }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),

                    }} />
                <Tab.Screen name="AddContainer" component={EmpyuScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({
                            color, size
                        }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),

                    }} />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarIcon: ({
                            color, size
                        }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),

                    }} />

            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);