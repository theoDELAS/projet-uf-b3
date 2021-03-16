import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView  } from 'react-native';

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
        console.log(inventory)
        setInventory(inventory)
      }, [])
  }

  console.log(user.steamId)

  return (
    <SafeAreaView>
        <Text>Mon profil - { user.email }</Text>
    </SafeAreaView>
  );
}

export default ProfileScreen;
