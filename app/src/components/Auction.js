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
  const [modalVisible, setModalVisible] = useState(false)
  const [price, setPrice] = useState(0)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
      getProduct()
  }, [])

  const getProduct = async () => {
    ProductService.getProduct(props.itemId.match(/(\d+)/))
    .then(response => {
        setProduct(response.data)
    })
  }

  const onChangePrice = (data) => {
    setPrice(parseInt(data));
  }

  const handleSubmit = () => {
    const data = {
      price: price,
    }
    
    if(price > props.price) {
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
            <Text>{props.price}</Text>
        </Animated.View>
      </Pressable>
      
      <Modal 
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modal}>
          
          <Text>{props.price}</Text>
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
      alignItems: 'center'
    }
  });

export default Auction;