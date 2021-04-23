import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import Auction from '../components/Auction'

import AuctionService from '../../services/AuctionService'

const SearchScreen = ({navigation}) => {
  const [auctions, setAuctions] = useState([])
  const [prices, setPrices] = useState(0)
  let userId = 1;

  useEffect(() => {
    getAllAuctions()
  }, [prices])

  const onChangePrice = (val) => {
    setPrices(val);
  }

  const getAllAuctions = async () => {
    await AuctionService.getAllAuctions()
    .then(response => {
      setAuctions(response.data['hydra:member'])
    })
  }

  return (
    <View style={styles.container}>
      {
        auctions.length > 0 ? (
          auctions.map((auction, index) => (
            <Auction onChangePrice={(val) => onChangePrice(val)} price={auction.price} itemId={auction.product} userId={userId} auctionId={auction.id} key={index} />
          ))
        ) : (
          <Text>Aucune enchère en cours</Text>
        )
      }
    </View>
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