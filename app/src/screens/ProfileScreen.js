import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Animated } from 'react-native';
import ItemCard from '../components/Card';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '1 Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '2 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '3 Item',
  },
  {
    id: '58694a0f-3d1-471f-bd96-145571e29d72',
    title: '4 Item',
  },
  {
    id: '58694a0f-3da1-471f-b6-145571e29d72',
    title: '5 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd71e29d72',
    title: '6 Item',
  },
  {
    id: '58694a0f-3da-bd96-145571e29d72',
    title: '7 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-142',
    title: '8 Item',
  },
];

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

const ProfileScreen = () => {
  // const y = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset : { translateY } } }], { useNativeDriver: true });

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        scrollEventThrottle={16}
        data={DATA}
        renderItem={({ item }) => (
          <Animated.View style={[styles.item, { transform: [{ translateY }] }]}>
            <Text style={styles.title}>{item.title}</Text>
          </Animated.View>
        )}
        keyExtractor={item => item.id}
        {...{onScroll}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, FlatList, Text, StatusBar } from 'react-native';
// import { Container, Content } from 'native-base';
// import ItemCard from "../components/Card";

// import UserService from '../../services/UserService'

// const DATA = [
//   {
//     id: 'zqes5dgf5faz5e8z5e',
//     title: 'First Item'
//   },
//   {
//     id: 'zert5yhtrezaEQRST5DG',
//     title: 'Second Item'
//   },
//   {
//     id: 'azed5frgt6ez9q8c54vrqge',
//     title: 'Thrid Item'
//   },
//   {
//     id: 'zera35qzf5',
//     title: 'Fourth Item'
//   }
// ]

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const ProfileScreen = ({navigation}) => {
//   const [inventory, setInventory] = useState({});
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // getInventory();
//   }, [])

//   const renderItem = ({ item }) => {
//     <Item title={item.title} />
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
  
//   const getInventory = () => {
//     console.log('azert :');
//     UserService.getInventory()
//       .then(res => {
//         const inventory = res.data
//         const result = []
//         for(const test in inventory.rgDescriptions) {
//           const tried = inventory.rgDescriptions[test]
//           result.push(tried)
//           if (!result) {
//             console.log("ERROR")
//           } else {
//             setInventory(result)
//           }
//         }
//       }, [])
//     }

//     const getItems = () => {
//       [inventory].map((t, key) => {
//         const arr = []
//         for(let i in t) {
//           const tester = t[i];
//           [tester.tags].map((item, index) => {
//             let colored = ''
//             for (let j in item) {
//               const oui = item[j]
//               // console.log(oui.color)
//               if (oui.category == "Rarity") {
//                 colored += oui.color
//               }
//             }
            
//             arr.push(
//               <ItemCard key={`${key}`} />
//             )

//           })
//           return arr
//         }
//       })
//     }
    

   
//     return (
//       <Container style={styles.cardCntnr}>
//         <Content>
//           <ItemCard />
//           <ItemCard />
//           <ItemCard />
//         </Content>
//       </Container>
//       // <View style={styles.container}>
//       // </View>
//     );
//   }

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });


// // const styles = StyleSheet.create({
// //   container: {
// //       flex: 1,
// //       alignItems: 'center',
// //       justifyContent: 'center'
// //   },
// //   cardCntnr: {
// //     paddingHorizontal: 15
// //   },
// //   container: {
// //     paddingTop: 50,
// //   },
// //   tinyLogo: {
// //     width: 50,
// //     height: 50,
// //   },
// //   logo: {
// //     width: 66,
// //     height: 58,
// //   },
// // })