import React, { useEffect, useState } from 'react';
import { 
  Animated,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  Pressable,
  Image

} from 'react-native';
import GlobalService from '../../services/GlobalService'
import AuctionService from '../../services/AuctionService'
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
    }, [buyer])
    
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

    const handleSubmit = async () => {
      const data = {
        isAccepted: true
      }
      AuctionService.updateAuction(props.auctionId, data)
      .then(() => {
        console.log("AFFAIRE CONCLUE")
      })
      .catch((err) => {
        console.log("CHEH" + err)
      })
    }

  return (
    isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#999999" />
        </View>
      ) : (
        <View>
        <Pressable style={{width: "100%"}}>
          <Animated.View style={styles.item}>
          <Image style={{width: "100%", height: 170, borderWidth: 1, borderColor: "red"}} source={{uri:`http://cdn.steamcommunity.com/economy/image/${product.image}`}} />
              <Text style={styles.title}>{product.name}</Text>
              <View style={{flexDirection: 'row',  justifyContent: "space-around"}}>
                <View>
                  <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Votre prix initial</Text>
                  <Text style={{fontWeight: 'bold'}}>{props.initialPrice}€</Text>
                </View>
                {
                  buyer ? (
                  <View>
                    <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Enchère en cours</Text>
                    <Text>{buyer.username}</Text>
                    <Text style={{fontWeight: 'bold'}}>{props.price} €</Text>
                    <Button
                      onPress={() => handleSubmit()}
                      title="Valider"
                    />
                  </View>
                  ) : ( 
                    <View>
                    <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'red'}}>Pas d'enchère en cours</Text>
                    {/* <Text>{buyer.username}</Text>
                    <Text style={{fontWeight: 'bold'}}>{props.price} €</Text> */}
                  </View>
                  )
                }
              </View>
          </Animated.View>
        </Pressable>
        </View>
      )
  );
};

const styles = StyleSheet.create({
    loader: {
        marginVertical: 15,
    },
    item: {
      backgroundColor: '#dedede',
      padding: 20,
      marginVertical: 0,
      marginHorizontal: 0,
    },
    title: {
      fontSize: 32,
    },
    modal: {
      paddingTop: 50,
      backgroundColor: '#dedede',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });


export default AuctionCard;