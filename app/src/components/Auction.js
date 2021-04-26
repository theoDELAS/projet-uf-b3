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
  TouchableOpacity,
  TouchableWithoutFeedback, 
  StatusBar, 
  Animatable,
  Button
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AuctionService from '../../services/AuctionService.js'
import UserService from '../../services/UserService.js'
import ProductService from '../../services/ProductService.js'
import axios from 'axios';

// const image = { uri: "https://reactjs.org/logo-og.png" };
const Auction = (props) => {
  const [product, setProduct] = useState([])
  const [seller, setSeller] = useState()
  const [buyer, setBuyer] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [price, setPrice] = useState(0)
  const [isValid, setIsValid] = useState(true)

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

  console.log('B');
  console.log(props.userId)

  const handleSubmit = () => {
    const data = {
      price: price,
      buyer: UserService.getOne(props.userId)
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
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Animated.View style={styles.item}>
            <Text style={styles.title}>{product.name}</Text>
            <Text>{props.initialPrice}</Text>
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
          <Text>{product.name}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{marginRight:50}}>
              <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Première enchère</Text>
              {
                seller ?
                <Text style={{textAlign:'center'}}>{seller.username}</Text>
                :
                null
              }
              <Text style={{fontWeight:'bold', textAlign:'center'}}>{props.initialPrice} €</Text>
            </View>
            <View style={{}}>
              {
                props.price ? (
                  <>
                  <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Enchère en cours</Text>
                  <Text style={{textAlign:'center'}}>{buyer.username}</Text>
                  <Text style={{fontWeight:'bold', textAlign:'center'}}>{props.price}</Text>
                  </>
                ) :
                (
                  <>
                  <Text style={{textTransform: 'uppercase', textAlign:'center', fontWeight:'bold', color:'#F2994A'}}>Enchère en cours</Text>
                  <Text style={{color:'red', textAlign:'center'}}>Aucune enchère</Text>
                  </>
                )
              }
              <Text>{props.price}</Text>
            </View>
          </View>
          <View style={{flex: 5}}>
          {
              !isValid ? (
                <>
                  <Text style={{color: "red"}}>L'enchère doit être supérieure à l'actuelle</Text>
                  <TextInput
                  placeholder="Prix"
                  onChangeText={(val) => onChangePrice(val)}
                  />
                </>
              ) : (
                <TextInput
                placeholder="Prix"
                onChangeText={(val) => onChangePrice(val)}
                />
              )
          }
          <TouchableOpacity onPress={() => handleSubmit()} >
            <Text>Envoyer</Text>
          </TouchableOpacity>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>Fermer</Text>
          </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
      backgroundColor: '#dedede',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default Auction;