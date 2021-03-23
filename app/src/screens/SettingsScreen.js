import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

const ExploreScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button title="Go to details screen" onPress={() => navigation.navigate("SupportScreen")} />
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