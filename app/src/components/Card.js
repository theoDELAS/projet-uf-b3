import React, { useState } from 'react';
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
import axios from 'axios';

// const image = { uri: "https://reactjs.org/logo-og.png" };
const ItemCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [price, setPrice] = useState(0)
  const device = '192.168.1.8';

  const onChangePrice = (data) => {
    setPrice(parseInt(data));
  }

  const handleSubmit = () => {
    const data = {
      product: `http://${device}:8000/api/products/${props.itemId}`,
      price: price,
      seller: `http://${device}:8000/api/users/${props.userId}`,
    }

    console.log('data : ', data);
    

    AuctionService.createAuction(data)
    .then((response) => {
      console.log(response)
      console.log("YALA")
    })
    .catch((err) => {
      console.log("MISKINE")
      console.log(err)
    })
  }

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Animated.View style={styles.item}>
            <Text style={styles.title}>{props.title}</Text>
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
          <Text>{props.title}</Text>
          <Text>{props.id}</Text>
          <TextInput
            placeholder="Prix"
            onChangeText={(val) => onChangePrice(val)}
          >
          </TextInput>
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

export default ItemCard;