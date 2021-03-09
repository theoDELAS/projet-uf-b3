// import { List } from 'react-native-paper';
// import React, { useEffect, useState } from 'react';

// import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import UserService from './services/UserService';

// const App = () => {

//   const [users, setUsers] = useState({})

//   useEffect(() => {
//     getAllUsers()
//   }, [])


//   const getAllUsers = () => {
//     UserService.getAll()
//       .then(res=> {
//         const userList = res.data['hydra:member']
//         console.log(userList)
//         setUsers(userList)
//       }, [])
//       .catch(err  => {
//         console.error(err)
//       })
//   }

//   console.log(users)
//   console.log(setUsers)

//   // const display = (userList) => {
//   //   const {users} = props
//   // }

//   return(
//     // {userList} = this.state;
//     // console.log(userList.map(user=> user.username))
//     <ScrollView>
//       <List.Section>
//         <List.Subheader>Utilisateurs</List.Subheader>
//         {
//           users.length > 0 && (
//             users.map(user => <li key={user.id}>{user.email}</li>)
//           )
//         }
//       </List.Section>
//     </ScrollView>
//   )
// }
import React from 'react';
import { StyleSheet } from 'react-native';
import BottomNavigation from './src/components/BottomNavigation';

const App = () => {
  return (
    <BottomNavigation />
  );
}

export default App;
