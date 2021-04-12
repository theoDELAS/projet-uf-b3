import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { ItemCard } from '../components/Card';

import UserService from '../../services/UserService'

const ProfileScreen = ({navigation}) => {
  const [inventory, setInventory] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInventory()
    parseAllItemsInInventory()
  }, [])

  const getInventory = () => {
    UserService.getInventory()
      .then(res => {
        const inventory = res.data
        const result = []
        for(const test in inventory.rgDescriptions) {
          const tried = inventory.rgDescriptions[test]
          result.push(tried)
          if (!result) {
            console.log("ERROR")
          } else {
            setInventory(result)
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    }

    const parseAllItemsInInventory = () => {
      [inventory].map((item) => {
        parseAllPropertyOfItem(item);
      })
      console.log(items);
    }

    const parseAllPropertyOfItem = (item) => {
      const arr = []
      for(let itemProperty in item) {
        const tester = item[itemProperty];
        [tester.tags].map((i, key) => {
          let colored = '';
          let quality = '';
          for (let j in i) {
            const oui = i[j]
            if (oui.category == "Rarity") {
              colored += oui.color
            } else if (oui.category == "Exterior") {
              quality = oui.name;
            }
          }
          // setItems(prevState => ({
          //     ...items,
          //     [{
          //       title: tester.market_hash_name,
          //       rarity: colored,
          //       quality: quality,
          //       image: `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`
          //     }]
          // }))
          // arr.push(<Text key={tester.classid}>{tester.market_hash_name} ---- {colored}</Text>)
        })
      }
    }

    return (
      <View style={styles.container}>
        <Button title="Go to home screen" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
})