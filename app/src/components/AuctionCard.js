import React, { useEffect, useState } from 'react';
import { 
  Animated,
  Text,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { Divider } from 'react-native-elements';
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
          <ActivityIndicator size="large" color="#999999" />
        </View>
      ) : (
        <View style={buyer.username ? (styles.itemAuction) : (styles.itemNoAuction)}>
            <Text style={styles.title}>{product.name}</Text>
            {
							buyer.username ? (
								<Text style={styles.content}>{buyer.username} propose {props.price}€</Text>
							) : (
								<Text style={styles.content}>Aucune enchère : mis à {props.price}€ minimum</Text>
							)
            }
        </View>
      )
  );
};

const styles = StyleSheet.create({
    itemAuction: {
      backgroundColor: "#dedede",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    itemNoAuction: {
      backgroundColor: "#dedede",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    title: {
      fontSize: 32,
    },
    content: {
      fontSize: 20
    },
    loader: {
        marginVertical: 15,
    }
  });


export default AuctionCard;