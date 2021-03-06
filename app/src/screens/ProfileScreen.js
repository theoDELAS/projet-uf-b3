import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Animated, Pressable, ScrollView } from 'react-native';
import AuctionCard from '../components/AuctionCard'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [price, setPrice] = useState(0);
  const [buyer, setBuyer] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const device = '192.168.1.36';
  let userId = 0;

  useEffect(() => {
    getAllAuctions();
  }, [userAuctions])

  const onChangePrice = (val) => {
    setPrice(val);
  }

  const getAllAuctions = async () => {
    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    await axios.get(`http://${device}:8000/api/auctions?seller=${userId}&is_accepted=0`)
    .then(res => {
      setUserAuctions(res.data['hydra:member'])
      res.data['hydra:member'].map(test => {
        setPrice(test.initialPrice)
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
                      <AuctionCard key={index} initialPrice={item.initialPrice} price={item.price} product={item.product} buyer={item.buyer} auctionId={item.id} />
                    )
                  })
                }
              </ScrollView>
            </SafeAreaView>
          ) : (
            <View style={styles.noDataCntnr}>
              <Text style={styles.noDataText}>Vous n'avez aucune enchère en cours</Text>
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