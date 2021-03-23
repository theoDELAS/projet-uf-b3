import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Image, ScrollView  } from 'react-native';
import { Card, List, Title } from 'react-native-paper'

import UserService from '../../services/UserService'

const ProfileScreen = () => {
  const [user, setUser] = useState({})
  const [inventory, setInventory] = useState({})

  useEffect(() => {
    getUser(),
    getInventory()
  }, [])

  const getUser = () => {
    UserService.getOne()
      .then(res =>  {
        const user = res.data
        console.log(user)
        setUser(user)
      }, [])
      .catch(err => {
        console.error(err)
      })
  }

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

  // console.log(user.steamId)

  return (
    <SafeAreaView>
        <ScrollView>
        <Text>Mon profil - { user.steamId }</Text>
        <ScrollView>
        {
          // console.log(inventory)
          // [inventory].forEach((i) => {
          //   // console.log(i)
          //   [i].map((e) => {
          //     console.log("array?:"+e)
          //     // return(
          //     e.map((t) => {
          //       // console.log("a")
          //       // console.log(t.classid)
          //       // return (
          //         <Text key={t.classid}>aS</Text>
          //       // )
          //     })
          //     // )
          //     // [e].forEach((t) =>{
          //     //   console.log(t)
          //     // })
          //   })
            // i.shift()
            // return(
              // let test= JSON.parse(i)
              // [i].forEach(item => {
              //   // console.log(item.classid)
              //   return (
              //     <Text key={item.classid}>{item.classid}</Text>
              //   )
              // })
              // [i].map((c) => {
              //   console.log(c.classid)
              //   return (
              //     // c.classid.shift()
              //     // console.log(c.classid + "A")
              //     console.log("A")
              //     // new Set(c.classid).size !== c.classid.length
              //   // console.log(i)
              //   // <Text key={c.classid}>{c.market_hash_name}</Text>
              //   )
              // })
            // )
            // return(
            // [t].slice(0, 2).map((c) => 
            //   <Card key={c.appid}>
            //   <Card.Title title="Test" />
            //   <Card.Content>
            //     <Title>{t.market_hash_name}</Title>
            //     {
            //       // console.log(c.tags)
            //       c.tags.map((value, key) => {
            //         // console.log(t.icon_url)

            //         console.log(`${value} valeur > ${key}`)

            //         if(key == 4) {
            //           return(<Card.Cover source={{ uri: `https://steamcommunity-a.akamaihd.net/economy/image/${t.icon_url}`}} />)

            //           // console.log(value)
            //           // [value].map((v, k) => {
            //           //   if (v == "color") {
            //           //     console.log(value[v])

            //           //   }

            //           // })
            //       // //     // console.log(Object.keys(c.tags)[key])
            //       // //     // value.map((v) => 
            //       // //     // console.log(v)
            //       // //     // )
            //         }
            //       })
            // </Card.Content>
            // </Card>
          })
        }
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
