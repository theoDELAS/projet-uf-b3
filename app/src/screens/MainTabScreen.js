import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import SearchScreen from './SearchScreen';
import FavoritesScreen from './FavoritesScreen';
import PublishScreen from './PublishScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createMaterialBottomTabNavigator();

const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const PublishStack = createStackNavigator();
const MessagesStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => (
        <Tab.Navigator
        initialRouteName="Rechercher"
        activeColor="#fff"
        barStyle={{ backgroundColor: 'tomato' }}
        >
        <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
            tabBarLabel: 'Rechercher',
            tabBarColor: '#009387',
            tabBarIcon: ({ color }) => (
                <Icon name="ios-search" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Favorites"
            component={FavoritesStackScreen}
            options={{
            tabBarLabel: 'Favoris',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({ color }) => (
                <Icon name="ios-heart" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Auction"
            component={PublishStackScreen}
            options={{
            tabBarLabel: 'Publier',
            tabBarColor: '#694fad',
            tabBarIcon: ({ color }) => (
                <Icon name="ios-add-circle" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Messages"
            component={MessagesStackScreen}
            options={{
            tabBarLabel: 'Messages',
            tabBarColor: '#d02860',
            tabBarIcon: ({ color }) => (
                <Icon name="ios-chatbubble" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
            tabBarLabel: 'Profil',
            tabBarColor: '#dfdfdf',
            tabBarIcon: ({ color }) => (
                <Icon name="ios-person" color={color} size={26} />
            ),
            }}
        />
        </Tab.Navigator>
)

export default MainTabScreen;

const SearchStackScreen = ({navigation}) => (
  <SearchStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <SearchStack.Screen name="Search" component={SearchScreen} options={{
      title:'Search',
      headerLeft: () => (
        <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#009387" 
          onPress={() => {
            navigation.openDrawer()
          }
        }></Icon.Button>
      )
    }} />
  </SearchStack.Navigator>
);

const FavoritesStackScreen = ({navigation}) => (
  <FavoritesStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#1f65ff'
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{
      title:'Favorites',
      headerLeft: () => (
        <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#1f65ff" 
          onPress={() => {
            navigation.openDrawer()
          }
        }></Icon.Button>
      )
    }} />
  </FavoritesStack.Navigator>
);

const PublishStackScreen = ({navigation}) => (
  <PublishStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#694fad'
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <PublishStack.Screen name="Publish" component={PublishScreen} options={{
      title:'Publish',
      headerLeft: () => (
        <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#694fad" 
          onPress={() => {
            navigation.openDrawer()
          }
        }></Icon.Button>
      )
    }} />
  </PublishStack.Navigator>
);

const MessagesStackScreen = ({navigation}) => (
  <MessagesStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#d02860'
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <MessagesStack.Screen name="Messages" component={MessagesScreen} options={{
      title:'Messages',
      headerLeft: () => (
        <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#d02860" 
          onPress={() => {
            navigation.openDrawer()
          }
        }></Icon.Button>
      )
    }} />
  </MessagesStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#dfdfdf'
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
      title:'Profile',
      headerLeft: () => (
        <Icon.Button 
          name="ios-menu" 
          size={25} 
          backgroundColor="#dfdfdf" 
          onPress={() => {
            navigation.openDrawer()
          }
        }></Icon.Button>
      )
    }} />
  </ProfileStack.Navigator>
);