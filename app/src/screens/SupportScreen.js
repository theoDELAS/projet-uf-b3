import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

const ExploreScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Support Screen</Text>
        <Button title="Go to home screen" onPress={() => navigation.navigate("Home")} />
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