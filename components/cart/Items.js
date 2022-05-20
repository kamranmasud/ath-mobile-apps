import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Items = props => {
  const {items, branch, navigation} = props;
  //const {branch} = props;
  const [count, setCount] = useState(0);
  const [isOrder, setIsOrder] = useState(false);
  const [customer, setCustomer] = useState('');
  const [order, setOrder] = useState('');
  const [token, setToken] = useState('');
  //const token = 'AAAA-BBBB-CCCC-DDDD';

  // const url =
  //   Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';
  const url =
  Platform.OS === 'ios' ? 'https://ath-restapi.herokuapp.com' : 'https://ath-restapi.herokuapp.com';
  useEffect(() => {
    getCart();
    return () => console.log('unmounting...');
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      console.log(props.branch);
      // Do something when the screen is focused
      //deleteCart();
      getData();
      getCart();
      console.log('Focused');
      //console.log(AsyncStorage.getItem('customer'));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('Unfocused');
      };
    }, []),
  );

  const deleteCart = async () => {
    try {
      //const jsonValue = JSON.stringify(value);
      await AsyncStorage.removeItem('cart');
      //setIsOrder(false);
    } catch (e) {
      // saving error
    }
  };

  const addCart = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('cart', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        let c = 0;
        data.forEach(element => {
          if (items.id === element.item) {
            c =
              element.cart[0].count +
              element.cart[1].count +
              element.cart[2].count;
          } else {
          }
        });
        setCount(c);
        // value previously stored
      } else {
        setCount(0);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const addCounter = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        //console.log(data);
        let c = 0;
        data.map((element, i) => {
          if (items.id === element.item) {
            data[i].cart[0].count = element.cart[0].count + 1;
            c =
              element.cart[0].count +
              element.cart[1].count +
              element.cart[2].count;
          } else {
          }
          //console.log(data[i].cart);
        });
        setCount(c);
        if (c === 0) {
          let save = {
            item: items.id,
            cart: [
              {count: 1, size: 'standard'},
              {count: 0, size: 'small'},
              {count: 0, size: 'large'},
            ],
          };
          data.push(save);
          //console.log(data);
          setCount(1);
        }
        deleteCart();
        addCart(data);
        // value previously stored
      } else {
        let save = [
          {
            item: items.id,
            cart: [
              {count: 1, size: 'standard'},
              {count: 0, size: 'small'},
              {count: 0, size: 'large'},
            ],
          },
        ];
        addCart(save);
        setCount(1);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const subtractCounter = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      //console.log(value);
      if (value !== null) {
        let data = JSON.parse(value);
        //console.log(data);
        let c = 0;
        let arr = [];
        data.map((element, i) => {
          if (items.id === element.item) {
            data[i].cart[0].count = element.cart[0].count - 1;
            c =
              element.cart[0].count +
              element.cart[1].count +
              element.cart[2].count;
            if (c !== 0) {
              arr.push(element);
            }
          } else {
            arr.push(element);
          }
        });
        setCount(c);
        deleteCart();
        addCart(arr);
        // value previously stored
      } else {
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('customer');
      if (value !== null) {
        let data = JSON.parse(value);
        setCustomer(data.cust.id);
        setToken(data.accessToken);
      } else {
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  const getOrder = async () => {
    try {
      const value = await AsyncStorage.getItem('order');
      //console.log(value);
      if (value !== null) {
        setIsOrder(true);
        let o = JSON.parse(value);
        setOrder(o.id);
        // value previously stored
      } else {
        setIsOrder(false);
      }
    } catch (e) {
      //return false;
      // error reading value
    }
  };

  return (
    <View style={styles.stores}>
      <Image source={{uri: items.image}} style={styles.images} />
      <View style={styles.infoBox}>
        <Text style={styles.productName}>{items.name}</Text>
        {props.bundles ? (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.bundledText}>AED {items.price}</Text>
            <Text style={styles.bundledPrice}>
              AED {items.price - (items.price * items.discount) / 100}
            </Text>
          </View>
        ) : (
          <Text style={styles.price}>AED {items.price}</Text>
        )}
        <Text style={styles.points}>You will get {items.points} points.</Text>
      </View>
      <View style={styles.cart}>
        {count === 0 ? (
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => addCounter()}>
            <Icon color={'#742013'} name="add" size={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.quantity}>
            <TouchableOpacity
              style={styles.valuesBtn1}
              onPress={() => subtractCounter()}>
              <Icon style={{color: '#742013'}} size={15} name="remove" />
            </TouchableOpacity>
            <View style={styles.numberBox}>
              <Text style={styles.numbers}>{count}</Text>
            </View>
            <TouchableOpacity
              style={styles.valuesBtn2}
              onPress={() => addCounter()}>
              <Icon style={{color: '#742013'}} size={15} name="add" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Customization', {
              items: items,
              count: count,
            })
          }>
          <Text style={styles.cust}>Customizable</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  cart: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cust: {
    marginTop: 2,
    fontSize: 10,
  },
  points: {
    fontSize: 10,
    color: '#4CBB17',
  },
  iconStyle: {
    borderRadius: 8,
    borderColor: '#742013',
    height: 35,
    width: 35,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stores: {
    padding: 15,
    flexDirection: 'row',
    height: 95,
    marginBottom: 10,
    borderRadius: 8,
  },
  images: {
    width: 70,
    height: 70,
  },
  infoBox: {
    marginLeft: 15,
    width: '55%',
  },
  productName: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },
  price: {
    fontSize: 10,
    marginTop: 7,
    marginBottom: 7,
    color: 'black',
    fontWeight: '500',
  },
  distance: {
    margin: 2,
    width: 55,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#e5e4e2',
    textAlign: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  bundledText: {
    fontSize: 10,
    color: 'black',
    fontWeight: '500',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  bundledPrice: {
    paddingLeft: 7,
    fontSize: 10,
    color: 'black',
    fontWeight: '500',
  },
  numbers: {
    fontSize: 11,
  },
  valuesBtn1: {
    height: 25,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesBtn2: {
    height: 25,
    width: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    width: 70,
    height: 25,
    borderRadius: 8,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

//export function getTotalItem(){}
