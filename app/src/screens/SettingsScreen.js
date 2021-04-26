import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import UserService from '../../services/UserService'
import ProductService from '../../services/ProductService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const SettingsScreen = ({navigation}) => {
  const [steamName, setSteamName] = useState()
  const device = '192.168.1.8'

  useEffect(() => {
    getSteamName()    
  }, [])

  const getSteamName = async () => {
    let userId;
    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    UserService.getOne(userId)
    .then(res => {
      setSteamName(res.data.steamName);
    })
  }

  const onChangeId = (val) => {
    setSteamName(val);
  }

  const handleSubmit = async () => {
    let userId;
    try {
      userId = await AsyncStorage.getItem('userId');
    } catch {
      console.log('error');
    }

    const data = {
      steamName: steamName
    }
    
    UserService.updateUser(userId, data)
  }

  const handleSynchronize = () => {
    axios.get(`https://steamcommunity.com/id/${steamName}/inventory/json/730/2`)
    .then(async res => {
      let userId;
      try {
        userId = await AsyncStorage.getItem('userId');
      } catch {
        console.log('error');
      }
      const inventory = res.data
      const result = []
      for(const test in inventory.rgDescriptions) {
        const tried = inventory.rgDescriptions[test]
        result.push(tried)
      }
      result.map((item) => {   
        const data = {
          classId: item.classid,
          name: item.market_hash_name,
          user: `http://${device}:8000/api/users/${userId}`,
          image: item.icon_url,
          description: "ndienfiq",
        }
        ProductService.postProduct(data)
      })  
    })
    .catch(err => {
        console.log(err.message);
    });
  }

    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 30, marginTop: 50}}>Votre profil</Text>
        <View style={{paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
          <Text style={{fontSize: 16}}>Identifiant Steam :</Text>
          <TextInput
            style={{fontSize: 16}}
            value={steamName}
            placeholder="Identifiant"
            onChangeText={(val) => onChangeId(val)}
          >
          </TextInput>
          <Button
            onPress={() => handleSubmit()}
            title="Valider"
          />
        </View>
        <Button
          onPress={() => handleSynchronize()}
          title="Synchroniser l'inventaire Steam"
        />
      </View>
    );
  }

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})