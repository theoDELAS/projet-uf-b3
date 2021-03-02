import { List } from 'react-native-paper';
import React from 'react';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
    <ScrollView style={styles.scrollView}>
      <List.Section>
        <List.Subheader>Utilisateurs</List.Subheader>
        {
          userList.map(user =>
              <List.Item key={user.id} title={user.username} titleStyle={styles.listFont} description={user.email} descriptionStyle={styles.description} left={() => <List.Icon icon="account" />} />
            )
        }
      </List.Section>
        {/* {
          userList.map(user=> <Text key={user.id}>{user.username}</Text>)
        } */}
    </ScrollView>
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
  // scrollView: {
  //   // backgroundColor: 'pink',
  //   // marginHorizontal: 20,
  // },
  listFont: {
    color: 'red'
  },
  description: {
    fontStyle: 'italic'
  }
});
