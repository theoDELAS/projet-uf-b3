import React, {useState, Component} from 'react';
import {Picker, Text, StyleSheet, View, SafeAreaView, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

const Register = () => {
  const device = '192.168.1.8'
  // const [currency, setCurrency] = useState('US Dollar');
  const [state, setState] = useState({
    email: "",
    username: "",
    password: ""
  })

  const handleInputChange = (value, name) => {
    setState({
      ...state,
      [name]: value
    });
  }
  

  const handleSubmit = (evt) => {
    axios.post(
      `http://${device}:8000/api/users`,
      state
    ).then(res => {
      console.log(res);
      console.log(res.data);
    }).catch(err => {
      console.log(err.message);
      
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.inputext}>S'inscrire</Text>
          <TextInput
            value={state.email}
            onChangeText={(email) => handleInputChange(email, 'email')}
            label='Email'
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            value={state.username}
            onChangeText={(username) => handleInputChange(username, 'username')}
            label='Pseudo'
            name='username'
            style={styles.input}
          />
          <TextInput
            value={state.password}
            onChangeText={(password) => handleInputChange(password, 'password')}
            label='Mot de passe'
            name='password'
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Button
            title={'Login'}
            style={styles.input}
            onPress={handleSubmit}
          />
        </View>
      </TouchableWithoutFeedback>
    // <SafeAreaView >
    //   <Text > Demo Form </Text>
    //   <View>
    //     <TextInput 
    //       placeholder="Email" />
    //     <TextInput
    //       secureTextEntry={true}
    //       placeholder="Password"
    //     />
    //     <Picker
    //       selectedValue={currency}
    //       onValueChange={currentCurrency => setCurrency(currentCurrency)}>
    //       <Picker.Item label="USD" value="US Dollars" />
    //       <Picker.Item label="EUR" value="Euro" />
    //       <Picker.Item label="NGN" value="Naira" />
    //     </Picker>
    //     <Text>
    //       Selected: {currency}
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default Register;