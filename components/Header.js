import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header(props) {
  const {navigation} = props;
  const [loginButton, setLoginButton] = useState(true);
  // useEffect(() => {
  //   return () => console.log('unmounting...');
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setTimeout(() => {
        getData();
        console.log('Focused');
      }, 1000);
      //console.log(AsyncStorage.getItem('customer'));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      //console.log(value);
      if (value !== null) {
        //console.log(value);
        setLoginButton(false);
        //return value;
        // value previously stored
      } else {
        setLoginButton(true);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };
  function isLoggedIn(navigation) {
    if (loginButton) {
      return (
        <View style={headerStyles.loginBtnBox}>
          <TouchableOpacity
            style={headerStyles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={headerStyles.continue}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={headerStyles.navToggle}
          onPress={() => navigation.navigate('More')}>
          <Image
            source={require('../asset/hamburger.png')}
            style={{width: 25, height: 20}}
          />
        </TouchableOpacity>
      );
    }
  }
  return (
    <ImageBackground
      source={require('../asset/Layer_2.png')}
      resizeMode="cover">
      <View style={headerStyles.header}>
        {isLoggedIn(navigation)}
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
    // justifyContent: 'space-between',
  },
  heading: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 45,
    height: 45,
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 13
  },
  loginBtn: {
    //margin: 5,
    width: 60,
    borderRadius: 15,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#742013', //'#D22B2B',
    flexDirection: 'row',
  },
  continue: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  loginBtnBox: {
    width: 75,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});