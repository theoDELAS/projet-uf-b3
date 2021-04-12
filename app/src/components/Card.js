import React from 'react';
import { Animated, Text, Image, StyleSheet } from 'react-native';
// import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

// const image = { uri: "https://reactjs.org/logo-og.png" };
const ItemCard = ({ title }) => {
    return (
        <Animated.View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </Animated.View>
    );

    // <Card>
    //     <CardItem cardBody>
    //         <Image source={image} style={{height: 200, width: null, flex: 1}}/>
    //     </CardItem>
    //     <CardItem>
    //         <Left>
    //             <Button iconLeft>
    //                 <Icon name="home" style={{fontSize: 20, color: 'red'}}/>
    //                 <Text>{title}</Text>
    //             </Button>
    //         </Left>
    //         <Right>
    //             <Button iconLeft>
    //                 <Icon name='home' />
    //                 <Text>Home</Text>
    //             </Button>
    //         </Right>
    //     </CardItem>
    // </Card>
};

const styles = StyleSheet.create({
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

export default ItemCard;