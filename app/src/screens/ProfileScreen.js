import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Animated, Pressable, ScrollView } from 'react-native';
import AuctionCard from '../components/AuctionCard'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalService from '../../services/GlobalService'

const ProfileScreen = ({navigation}) => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [price, setPrice] = useState(0);
  const [buyer, setBuyer] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const device = '172.20.10.3';
  let userId = 1;

  useEffect(() => {
    getAllAuctions();
  }, [])

  const onChangePrice = (val) => {
    setPrice(val);
  }

  const getAllAuctions = async () => {
    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    await axios.get(`http://${device}:8000/api/auctions?seller=${userId}`)
    .then(res => {
      setUserAuctions(res.data['hydra:member'])
      res.data['hydra:member'].map(test => {
        setPrice(test.price)
      })
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch(e => {
      console.log('Impossible de récupérer les mises aux encheres de l\'utilisateur : ', e)
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
          userAuctions.length > 0 ? (
            <SafeAreaView>
              <ScrollView>
                {
                  userAuctions.map((item, index) => {
                    return (
                      <AuctionCard key={index} price={item.price} product={item.product} buyer={item.buyer} />
                    )
                  })
                }
              </ScrollView>
            </SafeAreaView>
          ) : (
            <View style={styles.noDataCntnr}>
              <Text style={styles.noDataText}>Vous n'avez aucun skin à vendre</Text>
            </View>
          )
        )
      }
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
})