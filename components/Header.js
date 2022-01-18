import React from 'react';
import {Text, Image, StyleSheet, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/GenericStyles';

export default function Header() {
  return (
    <ImageBackground
      source={require('../asset/Layer_2.png')}
      resizeMode="cover">
      <View style={headerStyles.header}>
        <View style={headerStyles.navToggle}>
          <Image
            source={require('../asset/hamburger.png')}
            style={{width: 25, height: 20}}
          />
          {/* <Icon name="menu" size={50} color="#7c2529" /> */}
        </View>
        <View style={headerStyles.heading}>
          <Text style={headerStyles.text}>Experience Emirati Hospitality</Text>
        </View>
        <View style={headerStyles.logo}>
          <Image
            source={require('../asset/logo.png')}
            style={headerStyles.image}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const headerStyles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 45,
    height: 45,
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navToggle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#742013',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
