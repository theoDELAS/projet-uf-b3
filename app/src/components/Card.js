import React, { useState } from 'react';
import { 
  Animated, 
  Modal, 
  Text,
  StyleSheet, 
  Pressable, 
  View, 
  TextInput, 
  Image,
  TouchableOpacity
} from 'react-native';
import AuctionService from '../../services/AuctionService.js';

// const image = { uri: "https://reactjs.org/logo-og.png" };
const ItemCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [price, setPrice] = useState(0)
  const device = '172.20.10.3';

  const onChangePrice = (data) => {
    setPrice(parseInt(data));
  }

  const handleSubmit = () => {
    const data = {
      product: `http://${device}:8000/api/products/${props.itemId}`,
      initialPrice: price,
      seller: `http://${device}:8000/api/users/${props.userId}`,
    }    

    AuctionService.createAuction(data)
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <Animated.View style={styles.item}>
          <Image
              style={styles.logo}
              source={{uri: `http://cdn.steamcommunity.com/economy/image/${props.image}`}}
            />
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
      borderRadius: 10
    },
    title: {
      fontSize: 32,
    },
    modal: {
      backgroundColor: '#dedede',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      resizeMode: 'contain',
      width: '100%',
      height: 120,
    },
  });

export default ItemCard;