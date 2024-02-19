import React, { useState, useContext } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Colors from '../Colors';
import { useNavigation } from '@react-navigation/native';
import ToDoContext  from '../Context/ToDoContext';

export default function LogIn() {
    const navigation = useNavigation();
    const { login } = useContext(ToDoContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorResult, setErrorResult] = useState('')

    const handleChangeEmail = (text) => {
        setEmail(text);
        setEmailError(false);
    };
    
    const handleChangePassword = (text) => {
        setPassword(text);
        setPasswordError(false); 
    };

    const isValidEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };

    const handleLogin = async () => {
        let error = false;
        if(!isValidEmail(email)){
            setEmailError(true)
            error=true
        }
        if(password.length<7){
            setPasswordError(true)
            error=true
        }
        if(error) return
        try {
            const userData = { Email: email, PasswordHash: password };
            let ans = await login(userData)
            navigation.navigate('Home');
            setErrorResult('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorResult(error.message)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text style={styles.title}>
                    LogIn
                </Text>
                <View style={styles.formcontainer}>
                    <TextInput placeholder='Email' style={styles.input} onChangeText={handleChangeEmail} value={email}/>
                    {emailError && <Text style={styles.errorText}>Invalid email</Text>}
                    <TextInput placeholder='Password' style={styles.input} onChangeText={handleChangePassword} secureTextEntry={true}  value={password}/>
                    {passwordError && <Text style={styles.errorText}>Password must be at least 6 characters long</Text>}
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>
                            LogIn
                        </Text>
                    </Pressable>
                    {errorResult!=='' && <Text style={styles.errorText}>{errorResult}</Text>}
                </View>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: Colors.blue}} >New in the app?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto'
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 20,
        color: Colors.black,
    },
    formcontainer: {
        paddingBottom: 8,
        marginBottom: 25,
        width: 400,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});