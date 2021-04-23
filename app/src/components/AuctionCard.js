import React, { useEffect, useState } from 'react';
import { 
  Animated,
  Text,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import GlobalService from '../../services/GlobalService'

// const image = { uri: "https://reactjs.org/logo-og.png" };
const AuctionCard = (props) => {   
    const [product, setProduct] = useState({});
    const [buyer, setBuyer] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const promise1 = new Promise((resolve) => {
            initData(resolve);
        })

        promise1.then(() => {
            setIsLoading(false)
        })
    }, [])
    
    const initData = (resolve) => {
        GlobalService.getResource(props.product)
        .then(res => {
            setProduct(res.data)
            if (props.buyer) {
                GlobalService.getResource(props.buyer)
                .then(res => {
                    setBuyer(res.data)
                })
                .then(() => {
                    resolve('ok')
                })
            } else {
                resolve('ok')
            }
        })
    }

  return (
    isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={buyer.username ? (styles.itemAuction) : (styles.itemNoAuction)}>
            <Text>{product.name}</Text>
            {
							buyer.username ? (
								<Text>{buyer.username} propose {props.price}€</Text>
							) : (
								<Text>Aucune enchère : mis à {props.price}€ minimum</Text>
							)
            }
        </View>
      )
  );
};

const styles = StyleSheet.create({
    itemAuction: {
			borderWidth: 1,
			borderColor: 'green',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemNoAuction: {
			borderWidth: 1,
			borderColor: 'red',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    loader: {
        marginVertical: 15,
    }
  });


export default AuctionCard;