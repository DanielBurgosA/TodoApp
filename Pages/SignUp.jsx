import React, { useState, useContext } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Colors from '../Colors';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import  ToDoContext  from '../Context/ToDoContext';

export default function SignUp() {
  const navigation = useNavigation();
  const { signUp } = useContext(ToDoContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const [show, setShow] = useState(false);
  
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChangeFirstName = (text) => {
    setFirstName(text);
    setFirstNameError(false);
  };

  const handleChangeLastName = (text) => {
    setLastName(text);
    setLastNameError(false);
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
    setEmailError(false);
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    setPasswordError(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateOfBirth(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName) {
        setFirstNameError(!firstName);
        setLastNameError(!lastName);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError(true);
        return;
      }

      if (password.length < 6) {
        setPasswordError(true);
        return;
      }

      const userData = { FirstName: firstName, LastName: lastName, Email: email, PasswordHash: password, DateOfBirth: dateOfBirth };
      await signUp(userData);
      Alert.alert('Login Successful', 'Hello nice to see you again');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Sign Up Failed', 'An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 25}}>
            <Text style={styles.title}>
                SignUp
            </Text>
            <View style={styles.formcontainer}>
              <TextInput placeholder='First Name' style={styles.input} onChangeText={handleChangeFirstName}/>
              {firstNameError && <Text style={styles.errorText}>First name is required</Text>}
              <TextInput placeholder='Last Name' style={styles.input} onChangeText={handleChangeLastName}/>
              {lastNameError && <Text style={styles.errorText}>Last name is required</Text>}
              <TextInput placeholder='Email' style={styles.input} onChangeText={handleChangeEmail}/>
              {emailError && <Text style={styles.errorText}>Invalid email</Text>}
              <TextInput placeholder='Password' style={styles.input} onChangeText={handleChangePassword} secureTextEntry={true}/>
              {passwordError && <Text style={styles.errorText}>Password must be at least 6 characters long</Text>}
              {!Platform.OS === 'web' && (
                <Pressable onPress={showMode}>
                  <Text style={styles.input}>Date of Birth</Text>
                </Pressable>
              )}
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateOfBirth}
                  mode="date"
                  is24Hour={true}
                  onChange={handleDateChange}
                />
              )}
              <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>
                  SignUp
                </Text>
              </Pressable>
            </View>
            <Pressable onPress={()=>navigation.navigate('LogIn')}>
                <Text>Already Signed in?</Text>
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
      width: '100hv'
  },
  title: {
      fontSize: 24,
      fontWeight: "800",
      marginBottom: 20,
      color: Colors.black,
  },
  formcontainer:{
      paddingBottom: 8,
      marginBottom:25 
  },
  input: {
      width: '',
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