import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PublishScreen = ({navigation}) => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, [])


  const getAllProducts = async () => {
    const device = '192.168.1.8';
    let userId = null;

    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    axios.get(`http://${device}:8000/api/products?user=${userId}`)
    .then(res => {
      let array = [...userProducts];
      res.data['hydra:member'].map(item => {
        array.push(item);
      })
      setUserProducts(res.data['hydra:member']);
    })
  }
  
  return userProducts.map(item => {
    return (
      <View style={styles.container}>
        <Text>{item.name}</Text>
        <Button title="Retourner à l'écran de recherche" onPress={() => navigation.navigate("Search")} />
      </View>
    )
  })
}

export default PublishScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})