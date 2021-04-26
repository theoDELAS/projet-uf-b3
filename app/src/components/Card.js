import React, { useState } from 'react';
import { 
  Animated, 
  Modal, 
  Text,
  StyleSheet, 
  Pressable, 
  View, 
  TextInput, 
  Button,
  Image,
  Divider
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
    .then(() => {
      props.onChangePrice(data.price)
    })
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
          <Image
            style={styles.logo}
            source={{uri: `http://cdn.steamcommunity.com/economy/image/${props.image}`}}
          />
          <Text style={{marginBottom: 15, fontSize: 22, textAlign:'center'}}>{props.title}</Text>
          <TextInput
            placeholder="Prix"
            keyboardType='number-pad'
            onChangeText={(val) => onChangePrice(val)}
          >
          </TextInput>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
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
    </>
  );
};

const styles = StyleSheet.create({
    item: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#dedede',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
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