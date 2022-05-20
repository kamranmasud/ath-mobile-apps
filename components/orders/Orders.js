import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import {Rating} from 'react-native-ratings';

import BackNav from '../BackNav';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Ratings from './Ratings';

const Orders = props => {
  const [token, setToken] = useState('');
  const [branch, setBranch] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);

  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';

  useFocusEffect(
    React.useCallback(() => {
      getData();
      getAllOrders();
      console.log('Focused');
      return () => {
        console.log('Unfocused');
      };
    }, []),
  );

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      if (value !== null) {
        let data = JSON.parse(value);
        setToken(data.accessToken);
        setCustomer(data.cust);
      } else {
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const getAllOrders = async () => {
    let custom = JSON.parse(await AsyncStorage.getItem('customer'));
    fetch(`${url}/get/order/customer/${custom.cust.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async resp => {
        try {
          const jsonResp = await resp.json();
          // alert(JSON.stringify(jsonResp));
          if (resp.status !== 200) {
            Alert.alert('Error', 'Data could not be fetched!', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ]);
          } else {
            setOrders(jsonResp);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getPayments = order => {
    console.log(order.id);
    fetch(`${url}/get/payment/order/${order.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async resp => {
        try {
          const jsonResp = await resp.json();
          if (resp.status !== 200) {
            console.log('Order could not be placed!');
            Alert.alert('Error', 'Data could not be fetched!', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ]);
          } else {
            props.navigation.navigate('OrderDetails', {
              order: order,
              payment: jsonResp,
            });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.box}>
      <BackNav
        navigation={props.navigation}
        login={true}
        innerText="My Orders"
      />
      <View style={styles.searchInputBox}>
        <TextInput style={styles.searchInput} />
        <TouchableOpacity style={styles.iconCircle}>
          <Icon name="search" size={15} color={'silver'} />
        </TouchableOpacity>
      </View>
      {orders
        ? orders.map(order => (
            <TouchableOpacity
              key={order.id}
              style={styles.ordersBox}
              onPress={() => getPayments(order)}>
              <Text style={styles.date}>
                Date: {order.time.substring(0, 10)}
              </Text>
              <Text style={styles.type}>{order.type.toUpperCase()}</Text>
              {
                //Capital Letters .toUpperCase()
              }
              <Text style={styles.info}>Order Number: {order.orderNumber}</Text>
              {/* <Text style={styles.info}>AED </Text> */}
              <Text style={styles.info}>Txn ID: {order.id}</Text>
              <Text style={styles.info}>Branch: {order.branch.name}</Text>
              <Text style={styles.status}>Status: {order.status}</Text>
              {/* <Rating
                type="custom"
                startingValue={0}
                ratingCount={5}
                ratingColor="grey"
                imageSize={25}
                ratingTextColor="grey"
                onFinishRating={ratingCompleted}
                style={{alignSelf: 'flex-start'}}
              /> */}
              {/* <View style={{flexDirection: 'row'}}>
                <Icon name="star" size={25} style={{marginRight: 2}} />
                <Icon name="star" size={25} style={{marginRight: 2}} />
                <Icon name="star" size={25} style={{marginRight: 2}} />
                <Icon name="star" size={25} style={{marginRight: 2}} />
                <Icon name="star" size={25} style={{marginRight: 2}} />
              </View> */}
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInputBox: {
    width: '100%',
    height: 45,
    backgroundColor: '#e5e4e2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconCircle: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  searchInput: {
    width: '80%',
    height: 45,
    marginLeft: 5,
  },
  ordersBox: {
    margin: 15,
  },
  date: {
    height: 20,
    color: 'grey',
    fontSize: 12,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  type: {
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
  },
  info: {
    marginBottom: 5,
  },
  status: {
    fontWeight: "bold"
  }
});
