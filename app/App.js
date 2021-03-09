// import { List } from 'react-native-paper';
// import React from 'react';

// import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import UserService from './services/UserService';

// export default class App extends React.Component {

//   state = {
//     userList: []
//   }

//   componentDidMount() {
//     UserService.getAll()
//       .then(res=> {
//         const userList = res.data['hydra:member']
//         this.setState({userList})
//       })
//   }

//   render() {
//     const {userList} = this.state;
//     console.log(userList.map(user=> user.username))

//     return(
//     <ScrollView style={styles.scrollView}>
//       <List.Section>
//         <List.Subheader>Utilisateurs</List.Subheader>
//         {
//           userList.map(user =>
//               <List.Item key={user.id} title={user.username} titleStyle={styles.listFont} description={user.email} descriptionStyle={styles.description} left={() => <List.Icon icon="account" />} />
//             )
//         }
//       </List.Section>
//         {/* {
//           userList.map(user=> <Text key={user.id}>{user.username}</Text>)
//         } */}
//     </ScrollView>
//     )
//   };
import React from 'react';
import { StyleSheet } from 'react-native';
import BottomNavigation from './src/components/BottomNavigation';

const App = () => {
  return (
    <BottomNavigation />
  );
}

export default App;
