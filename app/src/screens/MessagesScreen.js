import React from 'react';
import { Text, SafeAreaView, ScrollView, Image  } from 'react-native';
import { Avatar, Divider, List, Title } from 'react-native-paper';

const MessagesScreen = () => {

  const titleCSS = {
    placement: {
      textAlign: "center",
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Title style={titleCSS.placement}>Messagerie</Title>
        <List.Item
          title="xX_TheoGamerzzz_Xx"
          description="1 Nouveau(x) message(s)"
          left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/cotton/2x/user-male.png"}}/>}
          >
        </List.Item>
        <Divider />
        <List.Item
          title="xX_TheoGamerzzz_Xx"
          description="1 Nouveau(x) message(s)"
          left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/cotton/2x/user-male.png"}}/>}
          >
        </List.Item>
        <Divider />
        <List.Item
          title="xX_TheoGamerzzz_Xx"
          description="1 Nouveau(x) message(s)"
          left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/cotton/2x/user-male.png"}}/>}
          >
        </List.Item>
        <Divider />
        <List.Item
          title="xX_TheoGamerzzz_Xx"
          description="1 Nouveau(x) message(s)"
          left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/cotton/2x/user-male.png"}}/>}
          >
        </List.Item>
        <Divider />
        <List.Item
          title="xX_TheoGamerzzz_Xx"
          description="1 Nouveau(x) message(s)"
          left={props => <List.Icon {...props} icon={{uri:"https://img.icons8.com/cotton/2x/user-male.png"}}/>}
          >
        </List.Item>
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MessagesScreen;
