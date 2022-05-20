import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackNav from '../BackNav';
import axios from 'axios';

const ViewProfile = props => {
  const [customer, setCustomer] = useState('');
  const [token, setToken] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );
  const getData = async () => {
    try {
      var url = "https://ath-restapi.herokuapp.com";

      const value = await AsyncStorage.getItem('customer');

      if (value !== null) {
        let data = JSON.parse(value);

        axios
          .get(url + "/get/customer/" + data.cust._id)
          .then(response => {
            setCustomer(response.data);
          })
          .catch(error => {
            console.log(error);
          });
        // value previously stored
      }

      // const value = await AsyncStorage.getItem('customer');
      // if (value !== null) {
      //   let data = JSON.parse(value);
      //   setCustomer(data.cust);
      //   setToken(data.acessToken);
      //   // value previously stored
      // } else {
      // }
    } catch (e) {
      console.log(e);
      //return false;
      // error reading value
    }
  };
  return (
    <View style={styles.box}>
      <BackNav navigation={props.navigation} login={true} innerText="Profile" />
      <TouchableOpacity
        style={styles.edit}
        onPress={() => props.navigation.navigate('EditProfile')}>
        <Icon size={15} color={'white'} name="edit" />
      </TouchableOpacity>
      <View style={styles.imageBox}>
        <View style={styles.imageCircle}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
        </View>
        <Text style={styles.nameText}>{customer?.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.detailsText}>{customer?.email}</Text>
        <Text style={styles.detailsText}>{customer?.phone}</Text>
        <Text style={styles.detailsText}>{customer?.dob}</Text>
      </View>
      <View style={styles.socialBox}>
        <Text style={styles.socialText}>Join us on Social Media</Text>
        <View style={styles.socialMedia}>
          <TouchableOpacity style={styles.socialCircle}>
            <Icon style={styles.socialIcon} name="facebook-f" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Icon style={styles.socialIcon} name="instagram" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle}>
            <Icon style={styles.socialIcon} name="twitter" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileInfo: {
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
  },
  imageCircle: {
    width: 110,
    height: 110,
    backgroundColor: '#ddc16d',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageBox: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: '#742013',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  nameText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  detailsText: {
    marginBottom: 5,
    color: 'black',
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 25,
    borderColor: '#f4f0ec',
    borderWidth: 1,
  },
  socialBox: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  joinText: {
    color: 'black',
  },
  socialIcon: {
    //backgroundColor: '#ddc16d',
    color: '#742013',
  },
  socialCircle: {
    width: 45,
    height: 45,
    backgroundColor: '#ddc16d',
    borderRadius: 22,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    margin: 20,
  },
});
