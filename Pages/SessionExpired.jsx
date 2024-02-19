import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Colors';

export default function SessionExpired({ onPress }) {
  const navigation  = useNavigation()

  const handleNavigateToLogIn = () => {
    navigation.navigate('LogIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Session Expired</Text>
      <Pressable onPress={handleNavigateToLogIn}>
        <Text style={styles.link}>Go to Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
});