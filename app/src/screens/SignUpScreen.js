import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Button, 
    StyleSheet, 
    Dimensions, 
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';
import Animated from 'react-native-reanimated';

const SignInScreen = ({navigation}) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        check_emailInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const { signUp } = React.useContext(AuthContext);

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

    const emailInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_emailInputChange: true,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_emailInputChange: false,
                isValidEmail: false,
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

    const handleConfirmPasswordChange = (val) => {
        if (val === data.password) {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const handleSignUp = (username, password, email) => {
        if (data.username.length === 0 || data.password === 0 || data.confirm_password === 0 || data.email === 0) {
            Alert.alert('Champs vides', 'Merci de bien vouloir remplir tous les champs', [
                {text: 'Ok'}
            ]);
            return;
        }
        const user = {
            username: username,
            email: email,
            password: password,
            token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
        signUp(user);
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Enregistrez-vous</Text>
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
                
                <Text style={[styles.text_footer, {marginTop:35}]}>Email</Text>
                <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => emailInputChange(val)}
                        />
                        {data.check_emailInputChange ?
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
                {data.isValidEmail ? null :
                    <Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={styles.errorMsg}>Votre mail n'est pas valide.</Text>
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

                <Text style={[styles.text_footer, {marginTop:35}]}>Confirmez votre mot de passe</Text>
                <View style={styles.action}>
                        <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirmez votre mot de passe"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) =>handleConfirmPasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.confirm_secureTextEntry ?
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
                {data.isValidConfirmPassword ? null :
                    <Animatable.View
                        animation="fadeInLeft"
                        duration={500}
                    >
                        <Text style={styles.errorMsg}>Vos mot de passe ne sont pas identiques.</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={() => { handleSignUp(data.username, data.password, data.email) }}>
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {color:'#fff'}]}>S'inscrire</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Se connecter</Text>
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