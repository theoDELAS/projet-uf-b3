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
        // const result = []
        for(const test in inventory.rgDescriptions) {
          const tried = inventory.rgDescriptions[test]
          // console.log(tried)
          // result.push(tried)
          setInventory(tried)

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
        <Text>Mon profil - { user.email }</Text>
        {/* <List.Section> */}
        {/* <List.Subheader>Votre inventaire</List.Subheader> */}
        {
          [inventory].map((t) => 
            // console.log(t.tags)

            [t].map((c) => 
            <Card key={t.appid}>
            <Card.Title title="Test" />
            <Card.Content>
              <Title>{t.market_hash_name}</Title>
{
            // console.log(c.tags)
            c.tags.map((value, key) => {
              console.log(t.icon_url)

              console.log(`${value} valeur > ${key}`)

              if(key == 4) {
                return(<Card.Cover source={{ uri: `https://steamcommunity-a.akamaihd.net/economy/image/${t.icon_url}`}} />)

                // console.log(value)
                // [value].map((v, k) => {
                //   if (v == "color") {
                //     console.log(value[v])

                //   }

                // })
            // //     // console.log(Object.keys(c.tags)[key])
            // //     // value.map((v) => 
            // //     // console.log(v)
            // //     // )
              }
              })
}
            </Card.Content>
            </Card>

            )
            
            // <List.Item key={t.appid} title={t.market_hash_name} />
            // <Text key={i}>{t.market_hash_name}</Text>

          )
        }
      {/* </List.Section> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
