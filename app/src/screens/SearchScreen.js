import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Auction from '../components/Auction'
import EventSource from 'react-native-event-source'

import AuctionService from '../../services/AuctionService'

const SearchScreen = ({navigation}) => {
  const [auctions, setAuctions] = useState([])
  const [prices, setPrices] = useState(0)
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
  }

  console.log(auctions)

  return (
    <SafeAreaView>
    <ScrollView>
      {
        auctions.map((auction, index) => (
          <Auction onChangePrice={(val) => onChangePrice(val)} initialPrice={auction.initialPrice} itemId={auction.product} userId={userId} sellerId={auction.seller} auctionId={auction.id} key={index} />
          ))
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