import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Auction from '../components/Auction'

import AuctionService from '../../services/AuctionService'

const SearchScreen = ({navigation}) => {
  const [auctions, setAuctions] = useState([])
  const [prices, setPrices] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
  let userId = 1;

  useEffect(() => {
    getAllAuctions()
  }, [])

  const onChangePrice = (val) => {
    setPrices(val);
  }

  const getAllAuctions = async () => {
    // const url = new URL('http://172.20.10.2:8000/api/auctions')
    // // url.searchParams.append('topic', 'http://172.20.10.2:8000/ping')
    // // const options = { headers: { Authorization: 'Bearer ...' } };
    // const eventSource = new EventSource(url)
    // console.log("AAAAAAAAAA")
    // eventSource.addEventListener('message', (event) =>  {
    //   console.log(event.data)
    //   const data = JSON.parse(event.data)
    //   console.log(data)
    // })
    await AuctionService.getAllAuctions()
    .then(response => {
      setAuctions(response.data['hydra:member'])
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch(e => {
      console.log('Impossible de récupérer encheres : ', e)
    })
  }

  console.log(auctions)

  return (
    <SafeAreaView>
    <ScrollView>
      {
        isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#999999" />
          </View>
        ) : (
          auctions.length > 0 ? (
            <SafeAreaView>
              <ScrollView>
                {
                  auctions.map((auction, index) => (
                    <Auction onChangePrice={(val) => onChangePrice(val)} price={auction.price} itemId={auction.product} userId={userId} auctionId={auction.id} key={index} />
                    ))
                }
              </ScrollView>
            </SafeAreaView>
          ) : (
            <Text>Aucune enchère en cours</Text>
          )
        )
      }
    </ScrollView>
  </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})