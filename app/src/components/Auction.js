import React, { useEffect, useState } from 'react';
import { 
  Animated, 
  Modal, 
  Text, 
  Image, 
  StyleSheet, 
  Pressable, 
  View, 
  TextInput, 
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AuctionService from '../../services/AuctionService.js'
import UserService from '../../services/UserService.js'
import ProductService from '../../services/ProductService.js'

// const image = { uri: "https://reactjs.org/logo-og.png" };
const Auction = (props) => {
  const [product, setProduct] = useState([])
  const [seller, setSeller] = useState()
  const [buyer, setBuyer] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [price, setPrice] = useState(0)
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSeller(),
    getProduct(),
    getBuyer()
  }, [])

  const getProduct = async () => {
    ProductService.getProduct(props.itemId.match(/(\d+)/))
    .then(response => {
      setProduct(response.data)
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch(e => {
      console.log('Impossible de récupérer la mise aux enchere de cet item : ', e)
    })
  }

  const getBuyer = async () => {
    if (props.buyerId) {
      UserService.getOne(props.buyerId.match(/(\d+)/))
      .then(response => {
        setBuyer(response.data)
      })
    }
  }

  const getSeller = async () => {
    if (props.sellerId) {
      UserService.getOne(props.sellerId.match(/(\d+)/))
      .then(response => {
        setSeller(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  } 

  const onChangePrice = (data) => {
    setPrice(parseInt(data));
  }

  const handleSubmit = () => {
    const data = {
      price: price,
      buyer: `http://172.20.10.2:8000/api/users/${props.userId}`
    }
    
    if(price > props.initialPrice) {
        setIsValid(true)
        AuctionService.updateAuction(props.auctionId, data)
        .then(() => {
          props.onChangePrice(price);
          setModalVisible(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
        setIsValid(false)
    }
  }

  return (
    isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    ) : (
      <View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Animated.View style={styles.item}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={{flexDirection: 'row',  justifyContent: "space-around"}}>
                <View>
                {
                  seller ? (
                  <Text>Vendeur : {seller.username}</Text>
                  )
                  :
                  null
                }
                  <Text>{props.initialPrice}€</Text>
                </View>
                {
                  buyer ? (
                    <View>
                    <Text>{buyer.username}</Text>
                    <Text><Text>{props.price}€</Text></Text>
                  </View>
                  ) : ( null)
                }
              </View>
          </Animated.View>
        </Pressable>
        
        <Modal 
          presentationStyle="pageSheet"
          animationType="slide"
          visible={modalVisible}
          // transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.modal}>
            <Image style={{width: 200, height: 200, borderWidth: 1, borderColor: "red"}} source={{uri:`http://cdn.steamcommunity.com/economy/image/${product.image}`}} />
            <Text style={{marginTop: 15, marginBottom: 15, fontSize: 22}}>{product.name}</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{marginRight:50}}>
                <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Première enchère</Text>
                {
                  seller ? (
                  <Text style={{textAlign:'center'}}>{seller.username}</Text>
                  )
                  :
                  null
                }
                <Text style={{fontWeight:'bold', textAlign:'center'}}>{props.initialPrice}€</Text>
              </View>
              <View style={{}}>
                {
                  props.price ? (
                    <>
                      <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Enchère en cours</Text>
                      {
                        buyer ? (
                          <Text style={{textAlign: 'center'}}>{buyer.username}</Text>
                        )
                        :
                        null
                      }
                      
                      <Text style={{fontWeight:'bold', textAlign:'center'}}>{props.price}€</Text>
                    </>
                  ) :
                  (
                    <Text style={{color:'red', textAlign:'center'}}>Aucune enchère</Text>
                  )
                }
              </View>
            </View>
            <View style={{flex: 5}}>
            {
                !isValid ? (
                  <>
                  <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Enchère en cours</Text>
                  {
                    buyer ?
                    <Text style={{textAlign:'center'}}>{buyer.username}</Text>
                    :
                    null
                  }
                  <Text style={{fontWeight:'bold', textAlign:'center'}}>{props.price}</Text>
                    <Text style={{color: "red"}}>L'enchère doit être supérieure à l'actuelle</Text>
                    <TextInput
                    keyboardType="numeric"
                    placeholder="Prix"
                    onChangeText={(val) => onChangePrice(val)}
                    />
                  </>
                ) : (
                  <TextInput
                  placeholder="Prix"
                  keyboardType="numeric"
                  onChangeText={(val) => onChangePrice(val)}
                  />
                )
            }
            <Button 
              onPress={() => handleSubmit()}
              title="Envoyer"
            />
            <Button 
              onPress={() => setModalVisible(!modalVisible)}
              title="Fermer"
            />
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#dedede',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
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

export default Auction;