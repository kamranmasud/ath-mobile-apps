import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackNav = props => {
  const {navigation} = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
        <Icon size={30} name="arrow-back" style={styles.icon} />
      </TouchableOpacity>
      <View style={props.login ? styles.textView : styles.textLocation}>
        {IsLogin(props.login, props.innerText)}
      </View>
    </View>
  );
};

export default BackNav;

function IsLogin(login, text) {
  //if login component then true else false
  if (login) return <Text style={styles.text}>{text}</Text>;
  else {
    return (
      <View>
        <Text style={styles.loc}>My Location</Text>
        <Text style={styles.textLoc}>location selector input</Text>
      </View>
    );
  }
}

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