import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SearchScreen from '../screens/Search';
import FavoritesScreen from '../screens/Favorites';
import PublishScreen from '../screens/Publish';
import MessagesScreen from '../screens/Messages';
import ProfileScreen from '../screens/Profile';

const SearchRoute = () => <SearchScreen />;

const FavoritesRoute = () => <FavoritesScreen />;

const PublishRoute = () => <PublishScreen />;

const MessagesRoute = () => <MessagesScreen />;

const ProfileRoute = () => <ProfileScreen />;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'search', title: 'Rechercher', icon: 'magnify' },
    { key: 'favorites', title: 'Favoris', icon: 'heart' },
    { key: 'publish', title: 'Publier', icon: 'expand-all' },
    { key: 'messages', title: 'Messages', icon: 'message' },
    { key: 'profile', title: 'Profil', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    favorites: FavoritesRoute,
    publish: PublishRoute,
    messages: MessagesRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: '#4f4f4f' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;