import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'

import UserService from '../../services/UserService'

const ProfileScreen = ({navigation}) => {
  const [inventory, setInventory] = useState({})

  const getInventory = () => {
    UserService.getInventory()
      .then(res => {
        const inventory = res.data
        // console.log(inventory.rgDescriptions)
        const result = []
        for(const test in inventory.rgDescriptions) {
          const tried = inventory.rgDescriptions[test]
          // console.log(tried)
          result.push(tried)
          if (!result) {
            console.log("ERROR")
          } else {
            setInventory(result)
          }

          // for(const again in tried) {
          //   console.log(tried[again])
          // }
          // console.log(inventory.rgDescriptions[test])
        }
        // setInventory(tried)
      }, [])
    }

    const test = () => {
      // return (
      // [inventory].forEach((i) => {
      //   // return (
      //   [i].map((e) => {
      //     console.log(e)
      //     e.map((t, key) => {
      //       // console.log(t)
      //       return(
      //         // console.log(key)
      //         <Text variant key={key}>{t.classid}</Text>
      //       )
      //     }
      //     )
      //   })
      // })
      // )
    }

    useEffect(() => {
      getInventory()
    }, [])

    return (
      <View style={styles.container}>
<<<<<<< HEAD
        {/* <Text>Profile Screen</Text> */}
        {
          [inventory].map((t, key) => {
            const arr = []
            for(let i in t) {
              const tester = t[i]
              console.log(key)
              arr.push(<Text key={tester.classid}>{tester.market_hash_name}</Text>)
              // {console.log(key)}

            }
            return arr
            // return(
              
            // )
          })
        }
        <Button title="Go to home screen" onPress={() => navigation.navigate("Home")} />
=======
        <Text>Profile Screen</Text>
        <Button title="Go to home screen" onPress={() => navigation.navigate("Search")} />
>>>>>>> 7682c2982422440a76c9704baffa530a16b02bea
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