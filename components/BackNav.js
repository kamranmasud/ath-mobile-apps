import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import RNGooglePlacePicker from 'react-native-google-place-picker';
//import LocationReact from './LocationReact';

const BackNav = props => {
  const {navigation} = props;
  const [location, setLocation] = useState('');

  const IsLogin = (login, text) => {
    //if login component then true else false
    if (login) return <Text style={styles.text}>{text}</Text>;
    else {
      return (
        <View>
          {/* <Text style={styles.loc}>My Location</Text> */}
          <Text style={styles.textLoc}>{location}</Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
        <Icon size={30} name="arrow-back" style={styles.icon} />
      </TouchableOpacity>
      {props.login ? (
        <View style={styles.textView}>
          {IsLogin(props.login, props.innerText)}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.textLocation}
          //onPress={onPress.bind(this)}
          onPress={() => navigation.navigate('GoogleMap')}>
          {IsLogin(props.login, props.innerText)}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BackNav;

const styles = StyleSheet.create({
  header: {
    padding: 5,
    height: 50,
    flexDirection: 'row',
    //backgroundColor: '#D22B2B',
    backgroundColor: '#742013',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //left: '40%',
  },
  loc: {
    color: 'white',
    fontSize: 12,
  },
  textLoc: {
    color: 'white',
    fontSize: 14,
  },
  textLocation: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
