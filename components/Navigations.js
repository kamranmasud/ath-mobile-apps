import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
//import font from './styles/GOUDOS.ttf';

const Navigations = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.options}>
        <Icon name="canadian-maple-leaf" size={20}></Icon>
        <Text>Home</Text>
      </View>
      <View style={styles.options}>
        {/* <Icon name="bars" size={20}></Icon> */}
        <Text style={styles.tims}>Tims</Text>
        <Text>Rewards</Text>
      </View>
      <View style={styles.options}>
        <Icon name="map-marker-alt" size={20}></Icon>
        <Text>Stores</Text>
      </View>
      <View style={styles.options}>
        <Icon2 name="signal-cellular-alt" size={20} style={styles.icon}></Icon2>
        <Text>More</Text>
      </View>
    </View>
  );
};

export default Navigations;

const styles = StyleSheet.create({
  navbar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0.3,
    borderColor: '#e5e4e2',
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tims: {
    fontFamily: 'serif',
  },
  icon: {
    transform: [{rotate: '270deg'}],
  },
});
