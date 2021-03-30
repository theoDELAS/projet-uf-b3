import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

const ExploreScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Publier une annonce</Text>
        <Button title="Retourner à l'écran de recherche" onPress={() => navigation.navigate("Search")} />
      </View>
    );
  }

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})