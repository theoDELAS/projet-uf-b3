import React, { useState, useEffect, useMemo } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    Alert,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';
import axios from 'axios';
import UserService from '../../services/UserService'
import slugify from 'slugify'

const SignInScreen = ({navigation}) => {

    const [inventory, setInventory] = useState({});
    const [products, setProducts] = useState({});
    const device = '192.168.1.8';
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const loginHandle = (userName, password) => {
        if (data.username.length === 0 || data.password === 0) {
            Alert.alert('Champs vides', 'Merci de bien vouloir remplir tous les champs', [
                {text: 'Ok'}
            ]);
            return;
        }
        
        axios.get(
            `http://${device}:8000/api/users`
            ).then(res => {
                const users = res.data['hydra:member'];
                const foundUser = users.filter( item => {
                    return userName === item.username // && password === item.password
                });
                if (foundUser.length === 0) {
                    Alert.alert('Utilisateur introuvable', 'Username ou mot de passe incorrect', [
                        {text: 'Ok'}
                    ]);
                    return;
                }
            signIn(foundUser);
          }).catch(err => {
            console.log(err.message);
        });
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Bienvenue !</Text>
                </View>
                <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Username"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                            duration={1500}
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={styles.errorMsg}>Votre username doit contenir 4 caractères minimum.</Text>
                    </Animatable.View>
                    }

                <Text style={[styles.text_footer, {marginTop:35}]}>Mot de passe</Text>
                <View style={styles.action}>
                        <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Votre mot de passe"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            : 
                            <Feather
                            name="eye"
                            color="grey"
                            size={20}
                            />
                            }
                        </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={styles.errorMsg}>Votre mot de passe doit contenir 6 caractères minimum.</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => { loginHandle(data.username, data.password) }}>
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color:'#fff'}]}>Se connecter</Text>
                            </LinearGradient>
                    </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>S'inscrire</Text>
                        </TouchableOpacity>
                </View>
            </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });