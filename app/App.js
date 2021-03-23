import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';

import RootStackScreen from './src/screens/RootStackScreen';
import { AuthContext } from './src/components/context';

import { DrawerContent } from './src/screens/DrawerContent';
import { ActivityIndicator, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const App = () => {
  const device = '192.168.1.8'

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
        break;
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        }
        break;
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        }
        break;
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        }
        break;
      default:
        break;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  
  const authContext = useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('ojhb');
      // setIsLoading(false);
      const userToken = String(foundUser[0].token);
      const userName = foundUser[0].username;

      try {
        userToken = 'dfdfdf';
        await AsyncStorage.setItem('userToken', userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },
    signUp: async(userLogs) => {
      try {
        await axios.post(
          `http://${device}:8000/api/users`,
          userLogs
        ).then(res => {
          const userToken = userLogs['token'];
          AsyncStorage.setItem('userToken', userToken)
          dispatch({type: 'REGISTER', id: userLogs['username'], token: userToken});
        }).catch(err => {
          console.log(err.message);
        })
      } catch (e) {
        console.log(e);
      }
      
      // setUserToken('erfg');
      // setIsLoading(false);
    },
  }), [])


  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false)
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent { ...props } />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          </Drawer.Navigator>
        )
      :
        <RootStackScreen/>
      }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;