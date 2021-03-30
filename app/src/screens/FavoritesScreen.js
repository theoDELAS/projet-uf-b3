import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

const FavoritesScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Favorites Screen</Text>
        <Button title="Go to search screen" onPress={() => navigation.navigate("Search")} />
      </View>
    );
  }

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})