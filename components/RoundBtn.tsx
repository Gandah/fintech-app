import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

type RoundBtnProps = {
    text: string;
    icon: typeof Ionicons.defaultProps;
    onPress?: () => void;
}
const RoundBtn = ({text, icon, onPress}: RoundBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.circle}>
          <Ionicons name={icon} size={30} color={Colors.dark}></Ionicons>    
        </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
    },
    circle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: Colors.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors.dark,
    },
  });

export default RoundBtn