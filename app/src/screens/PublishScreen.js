import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/Card';

import axios from 'axios';

const PublishScreen = ({navigation}) => {
  const [userProducts, setUserProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const device = '192.168.1.8';

  useEffect(() => {
    getAllProducts();
  }, [userProducts])

  const getAllProducts = async () => {
    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    await axios.get(`http://${device}:8000/api/products?user=${userId}`)
    .then(res => {
      setUserProducts(res.data['hydra:member']);
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch(e => {
      console.log('Impossible de récupérer les skins dans l\'inventaire de l\'utilisateur : ', e);
    })
  }
  
  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#999999" />
          </View>
        ) : (
          userProducts.length > 0 ? (
            <SafeAreaView>
              <ScrollView>
                {
                  userProducts.map((item, index) => (
                    <ItemCard navigation={navigation} image={item.image} itemId={item.id} title={item.name} key={index} />
                    )
                    )
                }
              </ScrollView>
            </SafeAreaView>
            ) : (
              <View style={styles.noDataCntnr}>
                <Text style={styles.noDataText}>Vous n'avez aucun skin à vendre</Text>
                <Button title="Vérifiez que vous avez bien renseigné votre identifiant Steam ici" onPress={() => navigation.navigate("SettingsScreen")} />
              </View>
            )
        )
      }
    </View>
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
  },


  item: {
    backgroundColor: '#dedede',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})