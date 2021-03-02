import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserService from './services/UserService';

export default class App extends React.Component {

  state = {
    userList: []
  }

  componentDidMount() {
    UserService.getAll()
      .then(res=> {
        const userList = res.data['hydra:member']
        this.setState({userList})
      })
  }

  render() {
    const {userList} = this.state;
    console.log(userList.map(user=> user.username))

    return(
    <View style={styles.container}>
        <h1>Users BDD</h1>
        {
          userList.map(user=> <Text key={user.id}>{user.username}</Text>)
        }
    </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
