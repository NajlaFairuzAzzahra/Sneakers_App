import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Explore = () => {
 return (
   <View style={styles.container}>
     <Text style={styles.text}>Explore</Text> 
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   justifyContent: 'center',
   alignItems: 'center'
 },
 text: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#333'
 }
});

export default Explore;