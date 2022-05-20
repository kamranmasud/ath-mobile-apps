import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Navigations from '../Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const More = props => {
  const displayListLoggedIn = [
    {text: 'My Profile', nav: 'ViewProfile'},
    {text: 'My Orders', nav: 'Orders'},
    {text: 'Favourites', nav: ''},
    {text: 'My Offers', nav: ''},
    {text: 'News', nav: ''},
    {text: 'About Us', nav: ''},
    {text: 'Contact Us', nav: ''},
    {text: 'FAQ', nav: ''},
    {text: 'Terms & Conditions', nav: ''},
    {text: 'Ver 1.0.0', nav: ''},
  ];
  const displayListLoggedOut = [
    {text: 'News', nav: ''},
    {text: 'About Us', nav: ''},
    {text: 'Contact Us', nav: ''},
    {text: 'FAQ', nav: ''},
    {text: 'Terms & Conditions', nav: ''},
    {text: 'Ver 1.0.0', nav: ''},
  ];
  const [log, setLog] = useState(false);
  function navigatePages(nav, name) {
    nav.navigate(name);
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
      setTimeout(() => {
        getData();
      }, 1000);

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        //console.log('Unfocused');
      };
    }, []),
  );

  const removeData = async () => {
    try {
      //const jsonValue = JSON.stringify(value);
      await AsyncStorage.removeItem('customer');
      //await AsyncStorage.setItem('customer', '');
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      // console.log(value);
      if (value !== null) {
        setLog(true);
      } else {
        setLog(false);
      }
    } catch (e) {
      console.log(e);
      setLog(false);
      //return false;
      // error reading value
    }
  };
  function logout() {
    AsyncStorage.removeItem('customer');
    removeData();
    setLog(false);
  }
  return (
    <View style={styles.box}>
      {
        log ?
        displayListLoggedIn.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.items}
            onPress={() => navigatePages(props.navigation, item.nav)}>
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        ))
        :
        displayListLoggedOut.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.items}
            onPress={() => navigatePages(props.navigation, item.nav)}>
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        ))
      }
      {log ? (
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logout} onPress={() => logout()}>
            Logout
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View style={styles.nav}>
        <Navigations navigation={props.navigation} />
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  items: {
    width: '100%',
    height: 50,
    borderColor: 'lightgrey',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: 50,
    width: '30%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#742013',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logout: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  nav: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
