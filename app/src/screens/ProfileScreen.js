import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';

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
        {/* <Text>Profile Screen</Text> */}
        {
          [inventory].map((t, key) => {
            const arr = []
            for(let i in t) {
              const tester = t[i];
              // console.log(tester)
              // [tester].map((p) => {
              //   console.log(p)
              //   for(let i in p) {
              //     if (i == "tags") {
              //       console.log(p[i])
              //     }
              //   }
              // })
              console.log(tester.tags);
              [tester.tags].map((i, jey) => {
                let colored = ''
                for (let j in i) {
                  const oui = i[j]
                  console.log(oui.color)
                  if (oui.category == "Rarity") {
                    colored += oui.color
                  }
                }
                arr.push(<Text key={tester.classid}>{tester.market_hash_name} ---- {colored}</Text>)

              })
              return arr
              // {console.log(key)}

            }
            // return(
              
            // )
          })
        }
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