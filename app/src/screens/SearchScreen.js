import React, {useEffect, useState} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import Auction from '../components/Auction'

import AuctionService from '../../services/AuctionService'

const SearchScreen = ({navigation}) => {
  const [auctions, setAuctions] = useState([])
  const [prices, setPrices] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  let userId = 1;

  useEffect(() => {
    getAllAuctions()
  }, [auctions])

  const onChangePrice = (val) => {
    setPrices(val);
  }

  const getAllAuctions = async () => {
    await AuctionService.getAllAuctions()
    .then(response => {
      setAuctions(response.data['hydra:member'])
    })
    .then(() => {
      setIsLoading(false);
    })
  }
  
  return (
    isLoading ? (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    ) : (
      auctions.length > 0 ? (
        <SafeAreaView>
          <ScrollView>
            {
              auctions.map((auction, index) => (
                <Auction onChangePrice={(val) => onChangePrice(val)} initialPrice={auction.initialPrice} itemId={auction.product} userId={userId} buyerId={auction.buyer} sellerId={auction.seller} auctionId={auction.id} price={auction.price} key={index} />
                ))
            }
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.noDataCntnr}>
          <Text style={styles.noDataText}>Aucune enchère en cours</Text>
        </View>
      )
    )
  );
}

export default SearchScreen;

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