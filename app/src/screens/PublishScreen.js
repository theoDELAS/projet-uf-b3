import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/Card';

import axios from 'axios';

const PublishScreen = ({navigation}) => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

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

    await axios.get(`http://${device}:8000/api/products?user=${userId}`)
    .then(res => {
      let array = [...userProducts];
      res.data['hydra:member'].map(item => {
        array.push(item);
      })
      setUserProducts(res.data['hydra:member']);
    })
    .then(() => {
      setIsLoading(false);
    })
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading ? (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          userProducts.length > 0 ? (
              userProducts.map((item, index) => (
                <ItemCard title={item.name} key={index} />
              ))
            ) : (
              <View style={styles.noDataCntnr}>
                <Text style={styles.noDataText}>Vous n'avez aucun skin à vendre</Text>
              </View>
            )
        )
      }
    </SafeAreaView>
  )
}

export default PublishScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  noDataCntnr: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  noDataText: {
      fontSize: 24,
      textAlign: 'center'
  }
})