import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
//import font from './styles/GOUDOS.ttf';
import {useRoute} from '@react-navigation/native';

const colour = '#742013';
var page = 'home';
const Navigations = props => {
  const {navigation} = props;
  const route = useRoute();
  page = route.name;
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigatePage(navigation, 'Landing')}>
        <Icon
          color={page === 'Landing' ? colour : 'grey'}
          name="canadian-maple-leaf"
          size={20}></Icon>
        <Text style={{color: page === 'Landing' ? colour : 'grey'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigatePage(navigation, 'Rewards')}>
        {/* <Icon name="bars" size={20}></Icon> */}
        <Text style={styles.tims}>ATH</Text>
        <Text style={{color: page === 'Rewards' ? colour : 'grey'}}>
          Rewards
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigatePage(navigation, 'Stores')}>
        <Icon
          color={page === 'Stores' ? colour : 'grey'}
          name="map-marker-alt"
          size={20}></Icon>
        <Text style={{color: page === 'Stores' ? colour : 'grey'}}>Stores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.options}
        onPress={() => navigatePage(navigation, 'More')}>
        <Icon2
          color={page === 'More' ? colour : 'grey'}
          name="signal-cellular-alt"
          size={20}
          style={styles.icon}></Icon2>
        <Text style={{color: page === 'More' ? colour : 'grey'}}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigations;

function navigatePage(nav, pg) {
  page = pg;
  if (pg === 'Stores') return nav.navigate('Stores');
  return nav.navigate(pg);
}
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
    color: page === 'rewards' ? colour : 'grey',
  },
  icon: {
    transform: [{rotate: '270deg'}],
  },
});
